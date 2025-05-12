const imageContainer = document.getElementById('image-container');
const loader =document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
const count = 10;
const apiKey = 'lqaEJ2JWUrM__BHs55oQ12IaDQ1dvV-wrpjRo5Hh0cY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded() {

    //check if all images are loaded
    imagesLoaded++;    
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; // Hide loader
        
    } 
    
}

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for Links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images =', totalImages);
    photosArray.forEach((photo) => {
        // Create wrapper for image and banner
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //event listener to check when image is finished loading
        img.addEventListener('load', () => {
            // Remove loader when image is loaded
            imageLoaded();
        });

        // Create banner for author
        const banner = document.createElement('div');
        banner.classList.add('banner');

        // Create hyperlink for author
        const authorLink = document.createElement('a');
        setAttributes(authorLink, {
            href: photo.user.links.html,
            target: '_blank', // Open link in a new tab
            rel: 'noopener noreferrer' // Security best practice
        });
        authorLink.textContent = `Photo by ${photo.user.name} on Unsplash`;

        // Append the hyperlink to the banner
        banner.appendChild(authorLink);

        // Append <img> and banner to the wrapper
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(banner);

        // Append the wrapper to the container
        imageContainer.appendChild(imageWrapper);
    });
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error) {
        console.log(error);
    }
}

//check if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; // Prevent multiple loads        
        getPhotos();
        
    }    
});

getPhotos();
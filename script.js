const imageContainer = document.getElementById('image-container');
const loader =document.getElementById('loader');

let photosArray = [];


//Unsplash API
const count = 10;
const apiKey = 'lqaEJ2JWUrM__BHs55oQ12IaDQ1dvV-wrpjRo5Hh0cY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for Links & Photos, add to DOM
function displayPhotos() {
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

getPhotos();
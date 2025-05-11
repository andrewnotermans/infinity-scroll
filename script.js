const imageContainer = document.getElementById('image-container');
const loader =document.getElementById('loader');

let photosArray = [];


//Unsplash API
const count = 10;
const apiKey = 'E1zKUOT5T8PLQPl69S7JsHX2bLk6a_YFJzNy2-SEfvg'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for Links & Photos, add to DOM
function displayPhotos(){
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
        href: photo.links.html,
        target: '_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_desscription
        });
       
        //put <img> inside <a>, then put both insideContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        console.log(error);
    }
}

getPhotos();
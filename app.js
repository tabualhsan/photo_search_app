


const auth = "563492ad6f9170000100000137a1ff9211194e519fff149a11b5c662"
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

// event listenrs 

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    searchPhotos(searchValue)
})
function updateInput(e){
    searchValue = e.target.value;

}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers:{
        Accept: 'application/json',
        Authorization: auth
        }
    });

    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);

    });  
}

async function curatedPhotos(){
   const data = await fetchApi("https://api.pexels.com/v1/curated");
   generatePictures(data);


 
}

async function searchPhotos(query){
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}`);
    generatePictures(data);
}

// this filters it to the search 
function clear(){
    gallery.innerHTML = "";
    searchInput.value = '';
}

curatedPhotos();






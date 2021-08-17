const Api_key = "563492ad6f91700001000001aa442a617270458bb2db2c08f8792d06";

const gallery = document.querySelector(".photo_gallary");
const load_more = document.querySelector(".load_more");
const form = document.querySelector(".header form");
const input = document.querySelector("input");
const alert_popup = document.querySelector(".alert_popup");
const alert_btn = document.querySelector(".alert_popup button");
let searchedImage;

let pageIndex = 1;
window.addEventListener("DOMContentLoaded", () => {
   getdata();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = input.value; 
    searchedImage = searchInput;
    if(searchInput  === '')
    {
        alert_popup.style.display = 'block';
    }
    else{
        gallery.innerHTML =" ";
        searchImages(searchInput);
    }
})

alert_btn.addEventListener('click',()=>
{
    alert_popup.style.display = 'none';
})

async function searchImages(search)
{
    load_more.setAttribute('data-img','search');
    const baseUrl = ` https://api.pexels.com/v1/search?query=${search}&page=${pageIndex}&per_page=20`;
    const data = await fetchPhotos(baseUrl);
    
    generateHTML(data.photos);
}

async function getdata(page) {
    load_more.setAttribute('data-img','curated')
    const baseUrl = `https://api.pexels.com/v1/search?query=nature&page=${page}&per_page=20`;
    const data = await fetchPhotos(baseUrl);   
    generateHTML(data.photos);
}

function generateHTML(photos)
{
    photos.forEach((photo,index)=> {
        const item = document.createElement('div')
        item.classList.add('image');
        item.innerHTML = `
        <a href=${photo.src.original}>
                        <img src=${photo.src.medium}>
                        <h4>${photo.photographer}</h4>
                    </a>
        `
        gallery.appendChild(item);
    });

    input.value = '';
}

load_more.addEventListener('click',(e)=>
{
    e.preventDefault();
    let index = ++pageIndex;
    const data_img = e.target.getAttribute('data-img');
    console.log(index);

    if(data_img === "curated")
    {
        getdata(index);
    }
    else if(data_img === "search")
    { 
        searchImages(searchedImage);
    }
})

async function fetchPhotos(base) {
    const baseUrl = base ;

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: Api_key,
        }
    })
    const data = response.json();
    console.log(data);
    return data;
}

// scroll to top 

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

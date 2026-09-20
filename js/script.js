
const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
const URL_PATH="https://image.tmdb.org/t/p/w500"
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
};

// start hero section
const heroImg = document.getElementsByClassName("hero-img")
const heroHeader= document.getElementsByClassName("hero-title")
const heroRate = document.getElementsByClassName("hero-rate")

async function getPopularMovie() {
    try{
        const response=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,options)
        const data =await response.json()
        console.log(data.results)

        data.results.slice(0,3).forEach((element,index)=>{
            heroImg[index].src=`${BACKDROP_URL+element.backdrop_path}`
            heroHeader[index].textContent=element.title
            heroRate[index].textContent=element.vote_average.toFixed(1)
        })

    }
    catch(err){
        console.error(err)
    }
}

getPopularMovie()

const trendingSec =document.getElementsByClassName("trending")

// start getTrendingMovies
async function getTrendingMovies() {
    try{
        const response =await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,options)
        const data =await response.json()
        // console.log(data.results)

        const content=document.createElement("div")
       content.className="cards row g-3"
       trendingSec[0].appendChild(content)

        data.results.slice(0,10).forEach(element => {

        content.innerHTML+=`<div class="card col-lg-2 col-md-3 col-6 overflow-hidden">
                <img src="${URL_PATH+element.poster_path}"  alt="${element.title}" class="object-fit-cover rounded-3 ">
                <div class="details rounded-3 ">
                    <h4>${element.title}</h4>
                    <i class="fa-solid fa-star"></i>
                    <span>${element.vote_average.toFixed(1)}</span>
                </div>
            </div> `
        });
    }
    catch(err){
        console.error(err)
    }
}
getTrendingMovies();

// start getTrendingTv
async function getTrendingTv() {
    try{
        const response =await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,options)
        const data =await response.json()
        // console.log(data.results)

        const content=document.createElement("div")
       content.className="cards row g-3"
       trendingSec[1].appendChild(content)

        data.results.slice(0,10).forEach(element => {

        content.innerHTML+=`<div class="card col-lg-2 col-md-3 col-6 overflow-hidden">
                <img src="${URL_PATH+element.poster_path}"  alt="${element.name}" class="object-fit-cover rounded-3 ">
                <div class="details rounded-3 ">
                    <h4>${element.name}</h4>
                    <i class="fa-solid fa-star"></i>
                    <span>${element.vote_average.toFixed(1)}</span>
                </div>
            </div> `
        });
    }
    catch(err){
        console.error(err)
    }
}
getTrendingTv();

// start getTopMovies
async function getTopMovies() {
    try{
        const response =await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,options)
        const data =await response.json()
        // console.log(data.results)

        const content=document.createElement("div")
       content.className="cards row g-3"
       trendingSec[2].appendChild(content)

        data.results.forEach(element => {

        content.innerHTML+=`<div class="card col-lg-2 col-md-3 col-6 overflow-hidden">
                <img src="${URL_PATH+element.poster_path}"  alt="${element.title}" class="object-fit-cover rounded-3 ">
                <div class="details rounded-3 ">
                    <h4>${element.title}</h4>
                    <i class="fa-solid fa-star"></i>
                    <span>${element.vote_average.toFixed(1)}</span>
                </div>
            </div> `
        });
    }
    catch(err){
        console.error(err)
    }
}
getTopMovies();

// start getTopTv
async function getTopTv() {
    try{
        const response =await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,options)
        const data =await response.json()
        // console.log(data.results)

        const content=document.createElement("div")
       content.className="cards row g-3"
       trendingSec[3].appendChild(content)

        data.results.forEach(element => {

        content.innerHTML+=`<div class="card col-lg-2 col-md-3 col-6 overflow-hidden">
                <img src="${URL_PATH+element.poster_path}"  alt="${element.name}" class="object-fit-cover rounded-3 ">
                <div class="details rounded-3 ">
                    <h4>${element.name}</h4>
                    <i class="fa-solid fa-star"></i>
                    <span>${element.vote_average.toFixed(1)}</span>
                </div>
            </div> `
        });
    }
    catch(err){
        console.error(err)
    }
}
getTopTv();
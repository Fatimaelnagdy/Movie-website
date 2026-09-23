const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
const URL_PATH = "https://image.tmdb.org/t/p/w500"
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
};

//get id from url
const param =new URLSearchParams(window.location.search)
const searchId=param.get("id")
const searchType=param.get("type")
console.log(searchId);
console.log(searchType);

//element varible
let heroSection = document.getElementById("hero")
let posterImg=document.getElementById("poster-img")
let title =document.getElementById("title")
let metaBadge=document.getElementsByClassName("meta-badge")
let imdbBtn=document.getElementById("imdb")
let overview=document.getElementById("overview")

let castImg=document.getElementById("cast-img")
let castTitle=document.getElementById("cast-title")
let castSubTitle=document.getElementById("cast-sub-title")
let trailerVideo=document.getElementById("trailerVideo")
let moreLike=document.getElementById("more-like")

// trailerVideo
async function getTrailerVideo(id,type) {
    try {
        const videoResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`, options)
        const videoData = await videoResponse.json()
        const trailer = videoData.results.find(video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        )
        if (trailer) {
            trailerVideo.src = `https://www.youtube.com/embed/${trailer.key}`
        }
    }
    catch (err) {
        console.error(err)
    }
}

//top cast
async function topCast(id,type) {
    try{
        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`,
            options
        );
        const data = await response.json();
        
        let topCast=document.querySelector(".top-cast")
        
        let casts=document.createElement("div")
        casts.className="casts d-flex gap-3"
        topCast.appendChild(casts)

        data.cast.forEach(element=>{
            let castItem=document.createElement("div")
            castItem.className="cast-item"

            castItem.innerHTML+=`
                <img src=${URL_PATH}${element.profile_path} alt=${element.original_name} id="cast-img">
                <h4 id="cast-title">${element.original_name}</h4>
                <span id="cast-sub-title">${element.character}</span>
            `
            casts.appendChild(castItem)
        })
    } catch (err) {
        console.error(err);
    }
}
//get more similar
async function getMoreLike(id,type){
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${API_KEY}`,
            options
        );
        const data = await response.json();

        const content = document.createElement("div")
        content.className = "cards row g-3"
        moreLike.appendChild(content)

        let title
        data.results.slice(0, 12).forEach((element) => {
            if(type==="tv"){
                title=element.name
            }
            else{
                title=element.title
            }
            const card = document.createElement("div");

            card.className = "card col-lg-3 col-md-4 col-6 overflow-hidden";

            card.innerHTML = `
             <img src="${URL_PATH}${element.poster_path}"
             alt="${title}"
             class="object-fit-cover rounded-3">

            <div class="details rounded-3">
            <h4>${title}</h4>
            <i class="fa-solid fa-star"></i>
            <span>${element.vote_average.toFixed(1)}</span>
            </div>
            `;

            card.addEventListener("click", () => {
                window.location.href = `details.html?id=${element.id}&type=${type}`
            });

            content.appendChild(card);
        });
    } catch (err) {
        console.error(err);
    }
}

//showSeasons
function showSeasons(data) {
    const right=document.querySelector(".right")

    const seasons = document.createElement("div")
        seasons.className = "trending"
    const head=document.createElement("h2")
    head.innerHTML="Seasons"
        head.className="head"
        seasons.appendChild(head)

    const content = document.createElement("div")
        content.className = "cards row g-3"
        seasons.appendChild(content)

        data.seasons.forEach((element) => {
            const card = document.createElement("div");

            card.className = "card col-lg-3 col-md-4 col-6 overflow-hidden";

            card.innerHTML = `
             <img src="${URL_PATH}${element.poster_path}"
             alt="${element.name}"
             class="object-fit-cover rounded-3">

            <div class="details rounded-3">
            <h4>season-${element.season_number}</h4>
            <i class="fa-solid fa-star"></i>
            <span>${element.vote_average.toFixed(1)}</span>
            </div>
            `;

            content.appendChild(card);
        });
        right.insertBefore(seasons, right.lastElementChild);
}

//get details 
async function getDetails(id,type) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`, options)
        const data = await response.json()
        console.log(data)
        
        heroSection.style.backgroundImage=`url("${BACKDROP_URL}${data.backdrop_path}")`;
        posterImg.src=`${URL_PATH}${data.poster_path}`
        if(type==="tv"){
            document.title=`${data.name}`
            title.innerHTML=`${data.name}`
            metaBadge[1].innerHTML=`${data.last_air_date.split("-", 1)}`
            metaBadge[2].innerHTML=`S-${data.number_of_seasons}, E-${data.number_of_episodes}`
            if(data.number_of_seasons>1){
                showSeasons(data)
            }
        }
        else{
            document.title=`${data.title}`
            title.innerHTML=`${data.title}`
            metaBadge[1].innerHTML=`${data.release_date.split("-", 1)}`
            metaBadge[2].innerHTML=`${data.runtime} min`
        }
        
        metaBadge[0].innerHTML=`<i class="fa-solid fa-star"></i> ${data.vote_average.toFixed(1)}`
        
        console.log(data.genres.length)
        if(data.genres.length===1){
            metaBadge[3].innerHTML=`${data.genres[0].name}`
        }
        else{
            const genres = data.genres.map(ele => ele.name).join(" • ");
            metaBadge[3].innerHTML=`${genres}`
        }

        metaBadge[4].innerHTML=`${data.original_language}`

        imdbBtn.href = `https://www.imdb.com/title/${data.imdb_id}/`;

        overview.innerHTML=data.overview
        //top cast
        topCast(id,type)
        
        //TrailerVideo
        getTrailerVideo(id,type)

        //more like
        getMoreLike(id,type)
    }
    catch(err){
        console.error(err)
    }
}

getDetails(searchId,searchType)
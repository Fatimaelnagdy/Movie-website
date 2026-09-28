const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
const URL_PATH = "https://image.tmdb.org/t/p/w500"
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
};

// varible
const heroSec = document.querySelector(".hero")
const heroDetails = document.querySelector(".details")
const arabicSec = document.getElementById("arabic")
const englishSec = document.getElementById("english")
const turkishSec = document.getElementById("turkish")
const koreanSec = document.getElementById("korean")
const spanishSec = document.getElementById("spanish")

//get search param
const param = new URLSearchParams(window.location.search)
const catType = param.get("type")
console.log(catType)

//get data
async function getHeroData(type) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?api_key=${API_KEY}&language=en-US&page=1`, options)
        const data = await response.json()
        const result = data.results[0]
        console.log(result)
        heroSec.style.backgroundImage = `url("${BACKDROP_URL}${result.backdrop_path}")`

        let title
        if (type === "tv") {
            title = result.name
        }
        else {
            title = result.title
        }
        heroDetails.innerHTML = `
            <h3>${title}</h3>
            <p>${result.overview}</p>
            <a href="details.html?type=${type}&id=${result.id}">Show Details</a>`

    }
    catch (err) {
        console.error(err)
    }
}
getHeroData(catType)

//showCategories
async function showCategories(lang, type, sec) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_original_language=${lang}&sort_by=popularity.desc`,
            options
        );
        const data = await response.json();

        const content = document.createElement("div")
        content.className = "cards row g-3"
        sec.appendChild(content)

        let title

        let languageName;

        if (lang === "ar") {
            languageName = "Arabic";
        }
        else if (lang === "en") {
            languageName = "English";
        }
        else if (lang === "tr") {
            languageName = "Turkish";
        }
        else if (lang === "ko") {
            languageName = "Korean";
        }
        else if (lang === "es") {
            languageName = "Spanish";
        }

        let header = document.createElement("div")
        header.className="header d-flex justify-content-between mb-3"

        header.innerHTML=`
            <h3>${languageName} ${type === "movie" ? "Movies" : "Series"}</h3>
            <a href="#">Show All <i class="fa-solid fa-arrow-right"></i></a>`

        sec.prepend(header)

        data.results.slice(0, 6).forEach((element) => {
            if (type === "tv") {
                title = element.name
            }
            else {
                title = element.title
            }

            const card = document.createElement("div");
            card.className = "card col-lg-2 col-md-3 col-6 overflow-hidden";

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

showCategories("ar", catType, arabicSec)
showCategories("en", catType, englishSec)
showCategories("tr", catType, turkishSec)
showCategories("ko", catType, koreanSec)
showCategories("es", catType, spanishSec)
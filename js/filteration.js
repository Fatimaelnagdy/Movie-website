const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
const URL_PATH = "https://image.tmdb.org/t/p/w500"
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
};

//get search param
const param = new URLSearchParams(window.location.search)
const filterType = param.get("type")
const filterLang = param.get("lang")

const cards = document.querySelector(".cards-ele")
const pagination = document.querySelector(".pagination");

async function showAll(lang, type, page = 1) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&sort_by=popularity.desc`,
            options
        );
        const data = await response.json();

        displayMovies(data.results, type, lang);
        createPagination(totalPages);

    } catch (err) {
        console.error(err);
    }
}

showAll(filterLang, filterType)

const totalPages = 12
let currentPage = 1;

function createPagination(totalPages) {

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const li = document.createElement("li");

        li.innerHTML = `
            <button style="
    width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: var(--dark-color);
  border: 1px solid var(--green-color);">${i}</button>
        `;

        li.addEventListener("click", () => {

            currentPage = i;

            showAll(filterLang, filterType, currentPage)
        });

        pagination.appendChild(li);
    }
}

function displayMovies(movies, type, lang) {
    cards.innerHTML = "";

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
    header.className = "header mb-3"

    header.innerHTML = `
            <h3 class="head">${languageName} ${type === "movie" ? "Movies" : "Series"}</h3>`
    cards.prepend(header)
    let title
    const content = document.createElement("div")
    content.className = "cards row g-3"
    cards.appendChild(content)
    movies.filter(element => element.adult === false && !element.genre_ids.includes(10749)).slice(0, 30).forEach((element) => {
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

}
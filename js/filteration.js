// const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
// const URL_PATH = "https://image.tmdb.org/t/p/w500"
// const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//     }
// };

// //get search param
// const param = new URLSearchParams(window.location.search)
// const filterType = param.get("type")
// const filterLang = param.get("lang")

// const cards = document.querySelector(".cards-ele")
// const pagination = document.querySelector(".pagination");
// let selectedSort = "popularity.desc";
// let selectedYear = "";
// let selectedGenre = "";

// // async function showAll(lang, type, page = 1) {
// //     try {
// //         const response = await fetch(
// //             `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&sort_by=popularity.desc`,
// //             options
// //         );
// //         const data = await response.json();

// //         displayMovies(data.results, type, lang);
// //         createPagination(totalPages);

// //     } catch (err) {
// //         console.error(err);
// //     }
// // }

// async function showAll(lang, type, page = 1) {

//     try {

//         let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&sort_by=${selectedSort}`;

//         if (selectedYear) {
//             if (type === "movie") {
//                 url += `&primary_release_year=${selectedYear}`;
//             } 
//             else {
//                 url += `&first_air_date_year=${selectedYear}`;
//             }
//         }

//         if (selectedGenre) {
//             url += `&with_genres=${selectedGenre}`;
//         }

//         const response = await fetch(url, options);
//         const data = await response.json();

//         displayMovies(data.results, type, lang);
//         createPagination(data.total_pages);

//     } catch (err) {
//         console.error(err);
//     }
// }


// const totalPages = 12
// let currentPage = 1;

// function createPagination(totalPages) {

//     pagination.innerHTML = "";
//     totalPages = Math.min(totalPages, 12);
//     for (let i = 1; i <= totalPages; i++) {

//         const li = document.createElement("li");

//         li.innerHTML = `
//             <button style="
//     width: 40px;
//   height: 40px;
//   border: none;
//   border-radius: 50%;
//   background-color: transparent;
//   color: var(--dark-color);
//   border: 1px solid var(--green-color);">${i}</button>
//         `;

//         li.addEventListener("click", () => {

//             currentPage = i;

//             showAll(filterLang, filterType, currentPage)
//         });

//         pagination.appendChild(li);
//     }
// }

// function displayMovies(movies, type, lang) {
//     cards.innerHTML = "";

//     let languageName;

//     if (lang === "ar") {
//         languageName = "Arabic";
//     }
//     else if (lang === "en") {
//         languageName = "English";
//     }
//     else if (lang === "tr") {
//         languageName = "Turkish";
//     }
//     else if (lang === "ko") {
//         languageName = "Korean";
//     }
//     else if (lang === "es") {
//         languageName = "Spanish";
//     }

//     let header = document.createElement("div")
//     header.className = "header mb-3"

//     header.innerHTML = `
//             <h3 class="head">${languageName} ${type === "movie" ? "Movies" : "Series"}</h3>`
//     cards.prepend(header)
//     let title
//     const content = document.createElement("div")
//     content.className = "cards row g-3"
//     cards.appendChild(content)
//     movies.filter(element => element.adult === false && !element.genre_ids.includes(10749)).slice(0, 30).forEach((element) => {
//         if (type === "tv") {
//             title = element.name
//         }
//         else {
//             title = element.title
//         }

//         const card = document.createElement("div");
//         card.className = "card col-lg-2 col-md-3 col-6 overflow-hidden";

//         card.innerHTML = `
//              <img src="${URL_PATH}${element.poster_path}"
//              alt="${title}"
//              class="object-fit-cover rounded-3">

//             <div class="details rounded-3">
//             <h4>${title}</h4>
//             <i class="fa-solid fa-star"></i>
//             <span>${element.vote_average.toFixed(1)}</span>
//             </div>
//             `;

//         card.addEventListener("click", () => {
//             window.location.href = `details.html?id=${element.id}&type=${type}`
//         });

//         content.appendChild(card);
//     });

// }

// const genreMenu = document.querySelector("#genreMenu");
// const filterBtn = document.querySelector("#filterBtn");


// async function getGenres() {
//     try {
//         const response = await fetch(
//             `https://api.themoviedb.org/3/genre/${filterType}/list?api_key=${API_KEY}&language=en`,
//             options
//         );

//         const data = await response.json();

//         genreMenu.innerHTML = "";

//         data.genres.slice(0, 6).forEach((genre, index) => {

//             const li = document.createElement("li");

//             li.innerHTML = `
//                 <button class="dropdown-item genre-item" 
//                     value="${genre.id}">
//                     ${genre.name}
//                 </button>
//             `;

//             li.querySelector("button").addEventListener("click", () => {
//                 selectedGenre = genre.id;
//             });

//             genreMenu.appendChild(li);

//             if (index < genres.length - 1) {
//                 genreMenu.innerHTML += `
//                     <li>
//                         <hr class="dropdown-divider">
//                     </li>
//                 `;
//             }
//         });

//     } catch (err) {
//         console.error(err);
//     }
// }

// document.querySelectorAll(".year-item").forEach(item => {

//     item.addEventListener("click", () => {
//         selectedYear = item.value;
//     });

// });
// document.querySelectorAll(".sort-item").forEach(item => {

//     item.addEventListener("click", () => {
//         selectedSort = item.value;
//     });

// });
// filterBtn.addEventListener("click", () => {

//     currentPage = 1;

//     showAll(filterLang, filterType, currentPage);

// });

// getGenres();

// showAll(filterLang, filterType);



const API_KEY = "2be71a89c6c29957ac7dcd067fcc4bf0";
const URL_PATH = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
};

// Get search params
const param = new URLSearchParams(window.location.search);
const filterType = param.get("type");
const filterLang = param.get("lang");

const cards = document.querySelector(".cards-ele");
const pagination = document.querySelector(".pagination");

const genreMenu = document.querySelector("#genreMenu");
const filterBtn = document.querySelector("#filterBtn");

// Selected filters
let selectedSort = "popularity.desc";
let selectedYear = "";
let selectedGenre = "";

let currentPage = 1;


// ================= GET MOVIES =================

async function showAll(lang, type, page = 1) {

    try {

        let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&sort_by=${selectedSort}`;

        // Year
        if (selectedYear) {

            if (type === "movie") {
                url += `&primary_release_year=${selectedYear}`;
            } 
            else {
                url += `&first_air_date_year=${selectedYear}`;
            }
        }

        // Genre
        if (selectedGenre) {
            url += `&with_genres=${selectedGenre}`;
        }

        console.log(url);

        const response = await fetch(url, options);
        const data = await response.json();

        displayMovies(data.results, type, lang);

        createPagination(data.total_pages);

    } catch (err) {
        console.error(err);
    }
}


// ================= PAGINATION =================

function createPagination(totalPages) {

    pagination.innerHTML = "";

    // Don't show more than 12 pages
    totalPages = Math.min(totalPages, 12);

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
                border: 1px solid var(--green-color);
            ">
                ${i}
            </button>
        `;

        li.addEventListener("click", () => {

            currentPage = i;

            showAll(filterLang, filterType, currentPage);

        });

        pagination.appendChild(li);
    }
}


// ================= DISPLAY MOVIES =================

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

    let header = document.createElement("div");

    header.className = "header mb-3";

    header.innerHTML = `
        <h3 class="head">
            ${languageName} ${type === "movie" ? "Movies" : "Series"}
        </h3>
    `;

    cards.appendChild(header);

    const content = document.createElement("div");

    content.className = "cards row g-3";

    cards.appendChild(content);


    movies
        .filter(element =>
            element.adult === false &&
            !element.genre_ids.includes(10749)
        )
        .slice(0, 30)
        .forEach((element) => {

            let title;

            if (type === "tv") {
                title = element.name;
            }
            else {
                title = element.title;
            }

            const card = document.createElement("div");

            card.className = "card col-lg-2 col-md-3 col-6 overflow-hidden";

            card.innerHTML = `
                <img 
                    src="${URL_PATH}${element.poster_path}"
                    alt="${title}"
                    class="object-fit-cover rounded-3"
                >

                <div class="details rounded-3">
                    <h4>${title}</h4>

                    <i class="fa-solid fa-star"></i>

                    <span>
                        ${element.vote_average.toFixed(1)}
                    </span>
                </div>
            `;

            card.addEventListener("click", () => {

                window.location.href =
                    `details.html?id=${element.id}&type=${type}`;

            });

            content.appendChild(card);

        });
}


// ================= GET GENRES =================

async function getGenres() {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/genre/${filterType}/list?api_key=${API_KEY}&language=en`,
            options
        );

        const data = await response.json();

        genreMenu.innerHTML = "";

        const genres = data.genres.slice(0, 6);

        genres.forEach((genre, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <button 
                    class="dropdown-item genre-item"
                    value="${genre.id}">
                    ${genre.name}
                </button>
            `;

            li.querySelector(".genre-item").addEventListener("click", () => {

                selectedGenre = genre.id;

            });

            genreMenu.appendChild(li);


            // Divider
            if (index < genres.length - 1) {

                const divider = document.createElement("li");

                divider.innerHTML = `
                    <hr class="dropdown-divider">
                `;

                genreMenu.appendChild(divider);
            }

        });

    } catch (err) {

        console.error(err);

    }
}


// ================= YEAR =================

document.querySelectorAll(".year-item").forEach(item => {

    item.addEventListener("click", () => {

        selectedYear = item.value;

    });

});


// ================= SORT =================

document.querySelectorAll(".sort-item").forEach(item => {

    item.addEventListener("click", () => {

        selectedSort = item.value;

    });

});


// ================= FILTER BUTTON =================

filterBtn.addEventListener("click", () => {

    currentPage = 1;

    showAll(filterLang, filterType, currentPage);

});


// ================= START =================

getGenres();

showAll(filterLang, filterType);
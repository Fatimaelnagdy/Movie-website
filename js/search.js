const searchInput = document.querySelector(".search");
const searchResults = document.getElementById("searchResults");

async function searchMovies() {

    try {
        let input = searchInput.value.trim();

        if (!input) {
             searchResults.innerHTML = "";
            searchResults.style.display = "none";
            return;
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(input)}`,
            options
        );

        const data = await response.json();
        searchResults.innerHTML = "";

        data.results
            .filter(item =>item.adult=== false && item.media_type === "movie" || item.media_type === "tv").slice(0, 5).forEach(item => {

                const li = document.createElement("li");

                li.textContent = item.media_type === "movie"
                    ? item.title
                    : item.name;
                    li.addEventListener("click", () => {
                        window.location.href =
                        `details.html?id=${item.id}&type=${item.media_type}`;
                    });
                    searchResults.appendChild(li);

                });
                searchResults.style.display = "block";

    } catch (err) {
        console.error(err);
    }
}

searchInput.addEventListener("input", searchMovies);
document.addEventListener("click", (e) => {

    const searchBox = document.querySelector(".search-box");

    if (!searchBox.contains(e.target)) {
        searchInput.value = "";
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
    }

});
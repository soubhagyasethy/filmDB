const myKey = "fdf2398f";
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value;

  const url = `https://www.omdbapi.com/?apikey=${myKey}&s=${searchTerm}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchResults.innerHTML = "";
      data.Search.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title} class="movie-poster">

            <div class="movie-detail">
                <h3>${movie.Title}</h3>
                <h3 class="movie-year">${movie.Year}<h3>
                <button class="favourite">Add to Favourites</button>
            </div>
        </div>`;

        const favouriteButton = movieElement.querySelector(".favourite");

        favouriteButton.addEventListener("click", () => {
          // Add movie to favourites list
        });

        searchResults.appendChild(movieElement);
      });
    })
    .catch((error) => console.error(error));
});

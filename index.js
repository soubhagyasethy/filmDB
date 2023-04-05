const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let debounceTimeoutId;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeoutId);
  debounceTimeoutId = setTimeout(() => {
    const searchTerm = searchInput.value;
    const url = `https://www.omdbapi.com/?apikey=fdf2398f&s=${searchTerm}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        searchResults.innerHTML = "";

        if (data.Search && Array.isArray(data.Search)) {
          data.Search.forEach((movie) => {
            const movieElement = document.createElement("div");
            movieElement.innerHTML = `
              <div class="movie">
                <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
                <div class="movie-detail">
                  <h3>${movie.Title}</h3>
                  <h3 class="movie-year">${movie.Type} • ${movie.Year}</h3>
                  <button class="favourite-button">Add to Favourites</button>
                </div>
              </div>
            `;

            const favouriteButton =
              movieElement.querySelector(".favourite-button");

            favouriteButton.addEventListener("click", () => {
              favouriteButton.innerHTML = "Added";

              // Get the favourites from local storage
              let favourites =
                JSON.parse(localStorage.getItem("favourites")) || [];

              // Add the movie to favourites if it's not already there
              if (!favourites.some((item) => item.imdbID === movie.imdbID)) {
                favourites.push({
                  imdbID: movie.imdbID,
                  timestamp: new Date().getTime(),
                });
                localStorage.setItem("favourites", JSON.stringify(favourites));
                updateFavouritesOrder(movie.imdbID, favourites);
              }
            });

            searchResults.appendChild(movieElement);
          });
        } else {
          console.log("No movies found or invalid API response");
        }
      })
      .catch((error) => console.error(error));
  }, 500);
});

function updateFavouritesOrder(movieID, favourites) {
  let movieIndex = -1;

  // Find the index of the movie object in the favourites array
  for (let i = 0; i < favourites.length; i++) {
    if (favourites[i].imdbID === movieID) {
      movieIndex = i;
      break;
    }
  }

  if (movieIndex !== -1) {
    // Update the timestamp of the existing movie object
    favourites[movieIndex].timestamp = new Date().getTime();

    // Move the movie object to the beginning of the list
    const [movie] = favourites.splice(movieIndex, 1);
    favourites.unshift(movie);
  } else {
    // Add the movie to the beginning of the list with the current timestamp
    favourites.unshift({ imdbID: movieID, timestamp: new Date().getTime() });
  }

  // Save the updated order to local storage
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

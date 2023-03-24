// const searchInput = document.getElementById("searchInput");
// const searchResults = document.getElementById("searchResults");
// let debounceTimeoutId;

// searchInput.addEventListener("input", () => {
//   clearTimeout(debounceTimeoutId);
//   debounceTimeoutId = setTimeout(() => {
//     const searchTerm = searchInput.value;
//     const url = `https://www.omdbapi.com/?apikey=fdf2398f&s=${searchTerm}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         searchResults.innerHTML = "";

//         data.Search.forEach((movie) => {
//           const movieElement = document.createElement("div");
//           movieElement.innerHTML = `
//             <div class="movie">
//                 <img src="${movie.Poster}" alt="${movie.Title} class="movie-poster">
//                 <div class="movie-detail">
//                     <h3>${movie.Title}</h3>
//                     <h3 class="movie-year">${movie.Type} • ${movie.Year}<h3>
//                     <button class="favourite-button">Add to Favourites</button>
//                 </div>
//             </div>`;

//           const favouriteButton =
//             movieElement.querySelector(".favourite-button");

//           favouriteButton.addEventListener("click", () => {
//             // Get the favourites from local storage
//             console.log("Clicked");
//             let favorites =
//               JSON.parse(localStorage.getItem("favourites")) || [];

//             // Add the movies to favourites if it's not already there
//             if (!favorites.includes(movie.imdbID)) {
//               favorites.push(movie.imdbID);
//               localStorage.setItem("favourites", JSON.stringify(favorites));
//             }
//           });

//           searchResults.appendChild(movieElement);
//         });
//       })
//       .catch((error) => console.error(error));
//   }, 500);
// });

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
              // Get the favourites from local storage
              console.log("Clicked");
              let favorites =
                JSON.parse(localStorage.getItem("favourites")) || [];

              // Add the movies to favourites if it's not already there
              if (!favorites.includes(movie.imdbID)) {
                favorites.push(movie.imdbID);
                localStorage.setItem("favourites", JSON.stringify(favorites));
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

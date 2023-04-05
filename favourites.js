const favouritesList = document.getElementById("favouritesList");

// Get the favourites from local storage
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// favourites.sort((a, b) => {
//   return b.timestamp - a.timestamp;
// });

console.log(favourites);
// Fetch the details of the favourites movies and display them in the list
favourites.forEach((favourite) => {
  const url = `https://www.omdbapi.com/?apikey=fdf2398f&i=${favourite.imdbID}`;

  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
      <div class="card">
        <img src="${movie.Poster}" alt="Movie Poster" class="card-img">
        <div class="card-body">
          <h2 class="card-title">${movie.Title}</h2>
          <h3 class="card-text">${movie.Type} . ${movie.Year}</h3>
          <button class="remove-btn">Remove</button>
        </div>
      </div>`;

      favouritesList.appendChild(movieElement);

      // Add event listener to remove button
      const removeButton = movieElement.querySelector(".remove-btn");
      removeButton.addEventListener("click", () => {
        // Remove the movie from favourites
        favourites = favourites.filter(
          (item) => item.imdbID !== favourite.imdbID
        );
        localStorage.setItem("favourites", JSON.stringify(favourites));

        // Remove the movie from the UI
        favouritesList.removeChild(movieElement);
      });
    })
    .catch((error) => console.error(error));
});

favourites.sort((a, b) => b.timestamp - a.timestamp);

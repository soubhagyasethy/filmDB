const favouritesList = document.getElementById("favouritesList");

// Get the favourites from local storage
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// Fetch the details of the favourites movies and display them in the list
favourites.forEach((imdbID) => {
  const url = `https://www.omdbapi.com/?apikey=fdf2398f&i=${imdbID}`;

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
    })
    .catch((error) => console.error(error));
});

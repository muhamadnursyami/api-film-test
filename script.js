const button = document.querySelector(".search-button");
button.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword").value;
  fetch("http://www.omdbapi.com/?apikey=2c90f209&s=" + inputKeyword)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      if (movies == undefined) {
        const undefined = document.querySelector(".undefined");
        let dataKosong = "";
        dataKosong += `<h5>Film yang anda cari tidak kami temukan </h5>`;
        undefined.innerHTML = dataKosong;
      } else {
        const undefined = document.querySelector(".undefined");
        undefined.innerHTML = "";
        let gabungData = "";
        movies.forEach((movie) => {
          gabungData += showCards(movie);
        });
        const containerMovie = document.querySelector(".movie-container");
        containerMovie.innerHTML = gabungData;

        const buttonDetails = document.querySelectorAll(
          ".modal-details-button"
        );
        buttonDetails.forEach((details) => {
          details.addEventListener("click", function () {
            const imdbid = this.dataset.imdbid;
            fetch("http://www.omdbapi.com/?apikey=2c90f209&i=" + imdbid)
              .then((response) => response.json())
              .then((response) => {
                const detailsMovie = showDetailsMovie(response);
                const modal = document.querySelector(".modal-body");
                modal.innerHTML = detailsMovie;
              })
              .catch((error) => console.info(`Error di ${error}`));
          });
        });
      }
    })
    .catch((error) => console.info(`Error di ${error}`));
});

function showCards(movie) {
  return `<div class="col-md-4 my-3 ">
            <div class="card bg-dark text-white">
              <img src="${movie.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary modal-details-button"  data-bs-toggle="modal"
                data-bs-target="#movieDetailsModal" data-imdbid ="${movie.imdbID}"
                  >Show
                  <details></details
                ></a>
              </div>
            </div>
          </div>`;
}

function showDetailsMovie(details) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${details.Poster}" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${details.Title} (${details.Year})</h4></li>
                  <li class="list-group-item">
                    <strong>Director : </strong>${details.Director}
                  </li>
                  <li class="list-group-item">
                    <strong>Actors</strong>: ${details.Actors}
                  </li>
                  <li class="list-group-item">
                    <strong>Writer : </strong> ${details.Writer}
                  </li>
                  <li class="list-group-item">
                    <strong> Plot : </strong> <br />
                    ${details.Plot}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}

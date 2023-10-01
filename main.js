//Initial References
let movieNameRef = document.getElementById("movie-name");
let movieYearRef = document.getElementById("movie-year");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let movieYear = movieYearRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&y=${movieYear}&apikey=${key}`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/512px-Star_icon_stylized.svg.png?20220926045328">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    
                    <ul class="details">
                        <li>${data.Year}</li>
                        <li>${data.Runtime}</li>
                        <li>${data.Genre}</li>
                    </ul>
                    
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            
        `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
          alert("Movie not found!");
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

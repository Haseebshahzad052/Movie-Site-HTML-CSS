//Initial References
let movieNameRef = document.getElementById("movie-name");
let movieYearRef = document.getElementById("movie-year");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let movieYear = movieYearRef.value;
  let url = `http://www.omdbapi.com/?s=${movieName}&y=${movieYear}&apikey=${key}`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const results = data.Search;
        //If movie exists in database
        if (results.length > 0) {
          result.innerHTML = results
            .map((data) => {
              return `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div class="data">
                    <h2>${data.Title}</h2>
                    
                    
                    <ul class="details">
                        <li>${data.Year}</li>
                        <li>${data.Type}</li>
                    </ul>
                    
                </div>
            </div>
            
            
        `;
            })
            .join("");
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

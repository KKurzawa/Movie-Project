var apiKey = "1ab627320337b55a37f95f68c3756c74";

var serachBtn = document.getElementById("search-btn");
serachBtn.addEventListener("click", getCity);
var trial1 = document.getElementById("trial");
var movieId;

function getCity() {
  // function to clear input
  trial1.innerText = "";
  var input = document.querySelector(".input");
  title = input.value;
  request();
}

function request() {
  var requestCity =
    "https://api.themoviedb.org/3/search/multi?&language=en-US&query=" +
    title +
    "&api_key=" +
    apiKey;
  fetch(requestCity).then(function (response) {
    if (response.ok) {
      console.log("all good");
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        if (data.results.length === 0) {
          console.log("error");
          var error1 = document.createElement("h2");
          error1.textContent = "Error";
          trial1.append(error1);
        } else if (data.results.length != 0) {
          movieId = data.results[0].id;
          console.log(typeof movieId);
          moviecredits();
          inputEl(data);
        }
      });
    } else {
      console.log("error");
    }
  });
}

function inputEl(data) {
  console.log(data);
  console.log(data.results[0].overview);
  console.log(data.results[0].poster_path);
  console.log(data.results[0].media_type);
  console.log(data.results[0].id);
  movidId = data.results[0].id;

  var movieTitle = document.createElement("h2");
  var description = document.createElement("p");
  movieTitle.textContent = data.results[0].title;
  description.textContent = data.results[0].overview;

  var currentimage = document.createElement("img");
  currentimage.src =
    "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
  trial1.append(movieTitle, description, currentimage);
}

function moviecredits() {
  var requestCity =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "/credits?language=en-US&api_key=" +
    apiKey;
  fetch(requestCity).then(function (response) {
    if (response.ok) {
      console.log("credits data");
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
          console.log(data.cast[i].name);
        }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

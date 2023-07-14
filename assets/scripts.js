var apiKey = "1ab627320337b55a37f95f68c3756c74";
var movieId;
var title;

var serachBtn = document.getElementById("search-btn");

if (serachBtn) {
  serachBtn.addEventListener("click", loadPage);
}

// function getTitle() {
//   var input = document.querySelector(".input");
//   title = input.value;
//   console.log(title);
//   // request();
// }
function loadPage() {
  window.location.assign(
    "results.html?q=" +
      encodeURIComponent(document.querySelector("input.input").value)
  );
  getSearchParameters();
}
function getSearchParameters() {
  var movieTitle = new URLSearchParams(window.location.search);
  title = movieTitle.get("q");
  console.log(title);
  request();
}
// var trial1 = document.getElementById("trial");
// function to clear input
// trial1.innerText = "";

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

function getPopular() {
  var requestPopular =
    "https://api.themoviedb.org/3/movie/popular?&language=en-US&api_key=" +
    apiKey;
  fetch(requestPopular).then(function (response) {
    if (response.ok) {
      console.log("Popular List");
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        for (var i = 0; i < 12; i++) {
          createPopularMovie(data.results[i]);
        }
      });
    }
  });
}
function createPopularMovie(movieData) {
  var movieTitle = movieData.title;
  var moviePoster = "https://image.tmdb.org/t/p/w342" + movieData.poster_path;
  var movieId = movieData.id;
  var createDiv = $("<div>");
  var imageDiv = $("<div>");
  var titleDiv = $("<div>");
  var imgTag = $("<img>");
  var pTag = $("<p>");
  var popularContainer = $("#popular-container");
  popularContainer.append(createDiv);
  createDiv.append(imageDiv);
  createDiv.append(titleDiv);
  imageDiv.append(imgTag);
  titleDiv.append(pTag);
  pTag.text(movieTitle);
  createDiv.addClass("card-image is-inline-block p-4");
  imageDiv.addClass("image");
  titleDiv.addClass(
    "content is-medium is-family-sans-serif has-text-black has-text-centered "
  );
  imgTag.attr("src", moviePoster);
  console.log(movieTitle, moviePoster, movieId);
}
// getPopular();

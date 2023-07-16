var apiKey = "1ab627320337b55a37f95f68c3756c74";
var movieId;
var searchedDiv = $("#searched");
var popularContainer = $("#popular-container");
var placeholderImage =
  "https://www.content.numetro.co.za/ui_images/no_poster.png";

var serachBtn = document.getElementById("search-btn");

if (serachBtn) {
  serachBtn.addEventListener("click", getTitle);
}

$("body").on("click", ".card-movie", loadPage);

function getTitle() {
  var input = document.querySelector(".input");
  title = input.value;
  console.log(title);
  request(title);
}
function loadPage() {
  window.location.assign("results.html?q=" + encodeURIComponent(this.id));
  // getSearchParameters();
}

// function getSearchParameters() {
//   var params = new URLSearchParams(window.location.search);
//   var idMovie = params.get("q");
//   console.log("url pulled id " + idMovie);
// }

var trial1 = document.getElementById("trial");

function request(title) {
  var requestMovies =
    "https://api.themoviedb.org/3/search/multi?&language=en-US&query=" +
    title +
    "&api_key=" +
    apiKey;
  fetch(requestMovies).then(function (response) {
    if (response.ok) {
      console.log("all good");
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        if (data.results.length === 0) {
          console.log("error");
          var error1 = $("<h2>");
          error1.text("Error");
          trial1.append(error1);
        } else if (data.results.length != 0) {
          var SearchedTitleDiv = $("#searched-title");
          var searchedTitle = $("<h3>");

          searchedDiv.text("");
          SearchedTitleDiv.text("");

          searchedTitle.text("Searched Movie: " + title.toUpperCase());
          searchedTitle.addClass(
            "is-size-2 is-family-sans-serif has-text-black m-6"
          );
          SearchedTitleDiv.append(searchedTitle);
          for (i = 0; i < 8; i++) {
            createMovieGrid(searchedDiv, data.results[i]);
          }

          // movieId = data.results[i].id;
          // console.log(typeof movieId);
          // moviecredits();
          // inputEl(data);
        }
      });
    } else {
      console.log("error");
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
        for (var i = 0; i < 10; i++) {
          createMovieGrid(popularContainer, data.results[i]);
        }
      });
    }
  });
}
function createMovieGrid(location, movieData) {
  if (movieData.title) {
    var movieTitle = movieData.title;
  }
  if (movieData.name) {
    var movieTitle = movieData.name;
  }

  if (movieData.poster_path) {
    var moviePoster = "https://image.tmdb.org/t/p/w342" + movieData.poster_path;
  } else {
    var moviePoster = placeholderImage;
  }

  var movieId = movieData.id;
  var createDiv = $("<div>");
  var imageDiv = $("<div>");
  var titleDiv = $("<div>");
  var imgTag = $("<img>");
  var pTag = $("<p>");
  location.append(createDiv);
  createDiv.append(imageDiv);
  createDiv.append(titleDiv);
  imageDiv.append(imgTag);
  titleDiv.append(pTag);
  pTag.text(movieTitle);
  createDiv.addClass("card-movie is-inline-block p-4 m-5");
  imageDiv.addClass("image");
  titleDiv.addClass(
    "content is-medium is-family-sans-serif has-text-black has-text-centered "
  );
  createDiv.attr("id", movieId);
  imgTag.attr("src", moviePoster);
  console.log(movieTitle, moviePoster, movieId);
}
if ($("#popular-container")) {
  getPopular();
}

var apiKey = "1ab627320337b55a37f95f68c3756c74";
var movieId;
var searchedDiv = $("#searched");
var popularContainer = $("#popular-container");
var placeholderImage =
  "https://www.content.numetro.co.za/ui_images/no_poster.png";

var notFound = $("#not-found");
var serachBtn = document.getElementById("search-btn");
var titlearray = [];

//check if the search exists adds event listener
if (serachBtn) {
  serachBtn.addEventListener("click", getTitle);
}

//adds event listener to dynamiclly created items
$("body").on("click", ".card-movie", loadPage);

//function for taking search input and calling fetch function
function getTitle() {
  notFound.text("");
  var input = document.querySelector(".input");
  title = input.value;
  if (title.trim().length === 0) {
    var error1 = $("<h2>");
    error1.text("Enter Movie Title");
    error1.addClass("is-size-3 is-family-sans-serif has-text-danger");
    notFound.append(error1);
  } else {
    setLocalStorage(title);
    request(title);
  }
}

// added
$(window).on("load", function () {
  var reset = JSON.parse(window.localStorage.getItem("Title"));
  if (reset !== null) {
    for (var i = 0; i < reset.length; i++) {
      titlearray.push(reset[i]);
    }
  }
});
function setLocalStorage(title) {
  titlearray.unshift(title);
  if (titlearray.length > 5) {
    titlearray.pop();
  }
  console.log("the title array: " + titlearray);
  localStorage.setItem("Title", JSON.stringify(titlearray));
}

//function to change page
function loadPage() {
  window.location.assign("results.html?q=" + encodeURIComponent(this.id));
}
//function to fetch with query parameters
function getSearchParameters() {
  var movieTitle = new URLSearchParams(window.location.search);
  title = movieTitle.get("q");
  console.log(title);
  request();
}

// function getSearchParameters() {
//   var params = new URLSearchParams(window.location.search);
//   var idMovie = params.get("q");
//   console.log("url pulled id " + idMovie);
// }

//function to fetch api
function request(title) {
  var requestMovies =
    "https://api.themoviedb.org/3/search/multi?&language=en-US&query=" +
    title +
    "&api_key=" +
    apiKey;
  fetch(requestMovies).then(function (response) {
    //checks if fetch response if ok
    if (response.ok) {
      console.log("all good");
      console.log(response);
      //converst reponse to json
      response.json().then(function (data) {
        console.log(data);
        if (data.results.length === 0) {
          notFound.text("");
          console.log("error");
          var error1 = $("<h2>");
          error1.text("No Search Results");
          error1.addClass("is-size-3 is-family-sans-serif has-text-danger");
          notFound.append(error1);
        } else if (data.results.length != 0) {
          //creates a title and div container for searched movie title
          notFound.text("");
          var SearchedTitleDiv = $("#searched-title");
          var searchedTitle = $("<h3>");
          //clears previous search
          searchedDiv.text("");
          SearchedTitleDiv.text("");
          //setting html and appending search to div
          searchedTitle.text("Searched Movie: " + title.toUpperCase());
          searchedTitle.addClass(
            "textColor is-size-2 is-family-sans-serif m-6"
          );
          SearchedTitleDiv.append(searchedTitle);
          //saves title to local storage

          //calls the function of movie grid and passes the location and data
          if (data.results.length < 8) {
            for (i = 0; i < data.results.length; i++) {
              createMovieGrid(searchedDiv, data.results[i]);
            }
          } else {
            for (i = 0; i < 8; i++) {
              createMovieGrid(searchedDiv, data.results[i]);
            }
          }

          movieId = data.results[0].id;
          console.log(typeof movieId);

          // inputEl(data);
        }
      });
    } else {
      console.log("error");
    }
  });
}
// added
$(".input").on("click", trialfx);
function trialfx(event) {
  event.stopPropagation();
  $("#search-history").empty();
  let newObject = JSON.parse(window.localStorage.getItem("Title"));
  // var createDiv = $("<div>");
  if (newObject !== null) {
    for (var i = 0; i < newObject.length; i++) {
      var createInput = $("<h5>");
      createInput.addClass("history-input");
      createInput.attr("id", newObject[i]);
      createInput.text(newObject[i]);
      $("#search-history").append(createInput);
    }
  }
}
$("body").on("click", hideHx);
function hideHx() {
  $("#search-history").empty();
}
$("body").on("click", ".history-input", addSearch);
function addSearch() {
  var searchBox = $(".input");
  searchBox.val(this.id);
  searchBox.addClass(column);
}



function getPopular() {
  //fetch recently popular movies
  var requestPopular =
    "https://api.themoviedb.org/3/movie/popular?&language=en-US&api_key=" +
    apiKey;
  fetch(requestPopular).then(function (response) {
    if (response.ok) {
      console.log("Popular List");
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        //calls movie grid function and passes a location and data
        for (var i = 0; i < 8; i++) {
          //limit to first 8 results
          createMovieGrid(popularContainer, data.results[i]);
        }
      });
    }
  });
}
function createMovieGrid(location, movieData) {
  //checks if moveData.title exists or movieData.name exists and sets
  if (movieData.title) {
    var movieTitle = movieData.title;
  }
  if (movieData.name) {
    var movieTitle = movieData.name;
  }
  //checks if there is a poster path and if not returns a place holder image
  if (movieData.poster_path) {
    var moviePoster = "https://image.tmdb.org/t/p/w342" + movieData.poster_path;
  } else {
    var moviePoster = placeholderImage;
  }

  var movieId = movieData.id;
  var cardContainer = $('<div>')
  var createDiv = $("<div>");
  var imageDiv = $("<div>");
  var titleDiv = $("<div>");
  var imgTag = $("<img>");
  var pTag = $("<p>");
  location.append(cardContainer);
  cardContainer.append(createDiv);
  createDiv.append(imageDiv);
  createDiv.append(titleDiv);
  imageDiv.append(imgTag);
  titleDiv.append(pTag);
  pTag.text(movieTitle);
  cardContainer.addClass('card-movie-container')
  createDiv.addClass("card-movie is-inline-block p-4 m-5");
  imageDiv.addClass("image");
  titleDiv.addClass(
    "textColor content is-medium is-family-sans-serif has-text-centered "
  );
  createDiv.attr("id", movieId);
  imgTag.attr("src", moviePoster);
  console.log(movieTitle, moviePoster, movieId);
}

//checks if popular-container exists if so run function
if ($("#popular-container")) {
  getPopular();
}

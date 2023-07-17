var apiKey = "1ab627320337b55a37f95f68c3756c74";
var idMovie;
 
function getSearchParameters() {
  var params = new URLSearchParams(window.location.search);
  idMovie = params.get("q");
  console.log("url pulled id " + idMovie);
  //saves id to local storage
  localStorage.setItem("id", idMovie);
}

// gets description data, title, movie poster, description
function movieData() {
  var detailsRequest =
    "https://api.themoviedb.org/3/movie/" +
    idMovie +
    "?language=en-US&api_key=" +
    apiKey;
  fetch(detailsRequest).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        //Displays title
        var title = data.original_title;
        document.querySelector("#title").innerHTML=title;
        //displays storyline
        var storyline = data.overview;
        document.querySelector("#storyline").innerHTML = storyline;
        var posterPath = data.poster_path
        var poster = $('#poster')
        poster.attr('src', 'https://image.tmdb.org/t/p/w300' +posterPath)
      });
    }  
  });
}

// gets name of cast memebers
function moviecredits() {
  var requestCity =
    "https://api.themoviedb.org/3/movie/" +
    idMovie +
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
          //displays cast
          var elActorOne = data.cast[0].name;
          document.querySelector("#actorOne").innerHTML = elActorOne;
          var elActorTwo = data.cast[1].name;
          document.querySelector("#actorTwo").innerHTML = elActorTwo;
          var elActorThree = data.cast[2].name;
          document.querySelector("#actorThree").innerHTML = elActorThree;
          var elActorFour = data.cast[3].name;
          document.querySelector("#actorFour").innerHTML = elActorFour;
          var elActorFive = data.cast[4].name;
          document.querySelector("#actorFive").innerHTML = elActorFive;
         }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

getSearchParameters();
movieData();
moviecredits();



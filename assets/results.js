var apiKey = "1ab627320337b55a37f95f68c3756c74";
var idMovie;

function getSearchParameters() {
  var params = new URLSearchParams(window.location.search);
  idMovie = params.get("q");
  console.log("url pulled id " + idMovie);
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

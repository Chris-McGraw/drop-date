app.service("mediaView", ["$rootScope", "$location", function($rootScope, $location) {

// _____________ VARIABLES
  var gameViewLink = document.getElementById("game-view-link");
  var movieViewLink = document.getElementById("movie-view-link");
  var tvViewLink = document.getElementById("tv-view-link");


// _____________ FUNCTIONS
  function clearMediaViewType() {
    gameViewLink.style.borderBottom = "none";
    movieViewLink.style.borderBottom = "none";
    tvViewLink.style.borderBottom = "none";
  }


  this.getCurrentType = function() {
    // console.log( $location.path() );

    if($location.path() === "/games/"
    || $location.path() === "/games/detail/"
    || $location.path() === "/games/results/") {
      clearMediaViewType();
      gameViewLink.style.borderBottom = "2px solid red";
    }

    else if($location.path() === "/movies/"
    || $location.path() === "/movies/detail/"
    || $location.path() === "/movies/results/") {
      clearMediaViewType();
      movieViewLink.style.borderBottom = "2px solid red";
    }

    else if($location.path() === "/tv/"
    || $location.path() === "/tv/detail/"
    || $location.path() === "/tv/results/") {
      clearMediaViewType();
      tvViewLink.style.borderBottom = "2px solid red";
    }

    else {
      clearMediaViewType();
    }
  }


}]);

app.directive("dropdownNavbar", ["$location", function($location) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var hamburgerBarTop = document.getElementById("hamburger-bar-top");
      var hamburgerBarMiddle = document.getElementById("hamburger-bar-middle");
      var hamburgerBarBottom = document.getElementById("hamburger-bar-bottom");

      var dropdownNavActive = true;

      var dropdownNav = document.getElementById("dropdown-nav");
      var gameViewDropdownLink = document.getElementById("game-view-dropdown-link");
      var movieViewDropdownLink = document.getElementById("movie-view-dropdown-link");
      var tvViewDropdownLink = document.getElementById("tv-view-dropdown-link");


// _____________ FUNCTIONS
      function expandDropdownNav() {
        hamburgerBarTop.classList.add("rotate-bar-top");
        hamburgerBarMiddle.classList.add("hide-bar-middle");
        hamburgerBarBottom.classList.add("rotate-bar-bottom");

        dropdownNav.classList.add("dropdown-nav-expand");
      }


      function retractDropdownNav() {
        hamburgerBarTop.classList.remove("rotate-bar-top");
        hamburgerBarMiddle.classList.remove("hide-bar-middle");
        hamburgerBarBottom.classList.remove("rotate-bar-bottom");

        dropdownNav.classList.remove("dropdown-nav-expand");
      }


      scope.toggleDropdownNav = function() {
        if(dropdownNavActive === true) {
          retractDropdownNav();

          dropdownNavActive = false;
        }
        else if(dropdownNavActive === false) {
          expandDropdownNav();

          dropdownNavActive = true;
        }
      }


      function clearMediaViewType() {
        gameViewDropdownLink.style.borderBottom = "none";
        movieViewDropdownLink.style.borderBottom = "none";
        tvViewDropdownLink.style.borderBottom = "none";
      }


      scope.$on("$locationChangeStart", function(event) {
        if($location.path() === "/games/"
        || $location.path() === "/games/detail/"
        || $location.path() === "/games/results/") {
          // console.log("games");

          clearMediaViewType();
          gameViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else if($location.path() === "/movies/"
        || $location.path() === "/movies/detail/"
        || $location.path() === "/movies/results/") {
          // console.log("movies");

          clearMediaViewType();
          movieViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else if($location.path() === "/tv/"
        || $location.path() === "/tv/detail/"
        || $location.path() === "/tv/results/") {
          // console.log("tv");

          clearMediaViewType();
          tvViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else {
          clearMediaViewType();
        }
      });


    }
  }
}]);

app.directive("navbarDropdown", ["$location", "userSearch", function($location, userSearch) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var dropdownNavActive = true;

      var hamburgerMenu = document.getElementById("hamburger-menu");
      var hamburgerBarTop = document.getElementById("hamburger-bar-top");
      var hamburgerBarMiddle = document.getElementById("hamburger-bar-middle");
      var hamburgerBarBottom = document.getElementById("hamburger-bar-bottom");

      var dropdownNav = document.getElementById("dropdown-nav");
      var dropdownLink = document.getElementsByClassName("dropdown-link");
      var gameViewDropdownLink = document.getElementById("game-view-dropdown-link");
      var movieViewDropdownLink = document.getElementById("movie-view-dropdown-link");
      var tvViewDropdownLink = document.getElementById("tv-view-dropdown-link");

// ---

      var dropdownSearchActive = false;

      var navbarSearchToggleLeft = document.getElementById("navbar-search-toggle-left");
      var navbarSearchToggleRight = document.getElementById("navbar-search-toggle-right");
      var searchToggleIconOpen = document.getElementsByClassName("search-toggle-icon-open");
      var searchToggleIconClose = document.getElementsByClassName("search-toggle-icon-close");

      var dropdownSearchContainer = document.getElementById("dropdown-search-container");
      var dropdownSearchSubmit = document.getElementById("dropdown-search-submit");
      var dropdownSearchInput = document.getElementById("dropdown-search-input");
      var mediaSearchSelect = document.getElementById("media-search-select");


// _____________ FUNCTIONS
      function expandDropdownNav() {
        hamburgerBarTop.classList.add("rotate-bar-top");
        hamburgerBarMiddle.classList.add("hide-bar-middle");
        hamburgerBarBottom.classList.add("rotate-bar-bottom");

        dropdownNav.classList.add("dropdown-nav-expand");

        angular.forEach(dropdownLink, function(link) {
          link.tabIndex = 0;
        });
      }


      function retractDropdownNav() {
        hamburgerBarTop.classList.remove("rotate-bar-top");
        hamburgerBarMiddle.classList.remove("hide-bar-middle");
        hamburgerBarBottom.classList.remove("rotate-bar-bottom");

        dropdownNav.classList.remove("dropdown-nav-expand");

        angular.forEach(dropdownLink, function(link) {
          link.tabIndex = -1;
        });
      }


      scope.toggleDropdownNav = function() {
        if(dropdownNavActive === true) {
          hamburgerMenu.disabled = true;
          navbarSearchToggleLeft.disabled = true;
          navbarSearchToggleRight.disabled = true;

          retractDropdownNav();
          dropdownNavActive = false;

          setTimeout(function() {
            hamburgerMenu.disabled = false;
            navbarSearchToggleLeft.disabled = false;
            navbarSearchToggleRight.disabled = false;
          }, 300);
        }
        else if(dropdownNavActive === false) {
          hamburgerMenu.disabled = true;
          navbarSearchToggleLeft.disabled = true;
          navbarSearchToggleRight.disabled = true;

          if(dropdownSearchActive === true) {
            retractDropdownSearch();
            dropdownSearchActive = false;

            setTimeout(function() {
              expandDropdownNav();
              dropdownNavActive = true;
            }, 300);

            setTimeout(function() {
              hamburgerMenu.disabled = false;
              navbarSearchToggleLeft.disabled = false;
              navbarSearchToggleRight.disabled = false;
            }, 600);
          }
          else {
            expandDropdownNav();
            dropdownNavActive = true;

            setTimeout(function() {
              hamburgerMenu.disabled = false;
              navbarSearchToggleLeft.disabled = false;
              navbarSearchToggleRight.disabled = false;
            }, 300);
          }
        }
      }


      function clearMediaViewType() {
        gameViewDropdownLink.style.borderBottom = "none";
        movieViewDropdownLink.style.borderBottom = "none";
        tvViewDropdownLink.style.borderBottom = "none";
      }

// ---

      function expandDropdownSearch() {
        dropdownSearchContainer.classList.add("dropdown-nav-expand");

        dropdownSearchSubmit.tabIndex = 0;
        dropdownSearchInput.tabIndex = 0;
        mediaSearchSelect.tabIndex = 0;

        angular.forEach(searchToggleIconOpen, function(icon) {
          icon.style.opacity = "0";
          icon.style.transform = "scale(0.0)";
        });

        setTimeout(function() {
          angular.forEach(searchToggleIconClose, function(icon) {
            icon.style.opacity = "1";
            icon.style.transform = "scale(1.0)";
          });
        }, 150);
      }


      function retractDropdownSearch() {
        dropdownSearchContainer.classList.remove("dropdown-nav-expand");

        dropdownSearchSubmit.tabIndex = -1;
        dropdownSearchInput.tabIndex = -1;
        mediaSearchSelect.tabIndex = -1;

        angular.forEach(searchToggleIconClose, function(icon) {
          icon.style.opacity = "0"
          icon.style.transform = "scale(0.0)"
        });

        setTimeout(function() {
          angular.forEach(searchToggleIconOpen, function(icon) {
            icon.style.opacity = "1"
            icon.style.transform = "scale(1.0)"
          });
        }, 150);
      }


      scope.toggleDropdownSearch = function() {
        if(dropdownSearchActive === true) {
          hamburgerMenu.disabled = true;
          navbarSearchToggleLeft.disabled = true;
          navbarSearchToggleRight.disabled = true;

          retractDropdownSearch();
          dropdownSearchActive = false;

          setTimeout(function() {
            hamburgerMenu.disabled = false;
            navbarSearchToggleLeft.disabled = false;
            navbarSearchToggleRight.disabled = false;
          }, 300)
        }
        else if(dropdownSearchActive === false) {
          hamburgerMenu.disabled = true;
          navbarSearchToggleLeft.disabled = true;
          navbarSearchToggleRight.disabled = true;

          if(dropdownNavActive === true) {
            if(window.innerWidth > 500) {
              retractDropdownNav();
              dropdownNavActive = false;

              expandDropdownSearch();
              dropdownSearchActive = true;

              setTimeout(function() {
                hamburgerMenu.disabled = false;
                navbarSearchToggleLeft.disabled = false;
                navbarSearchToggleRight.disabled = false;
              }, 300);
            }
            else {
              retractDropdownNav();
              dropdownNavActive = false;

              setTimeout(function() {
                expandDropdownSearch();
                dropdownSearchActive = true;
              }, 300);

              setTimeout(function() {
                hamburgerMenu.disabled = false;
                navbarSearchToggleLeft.disabled = false;
                navbarSearchToggleRight.disabled = false;
              }, 600);
            }
          }
          else {
            expandDropdownSearch();
            dropdownSearchActive = true;

            setTimeout(function() {
              hamburgerMenu.disabled = false;
              navbarSearchToggleLeft.disabled = false;
              navbarSearchToggleRight.disabled = false;
            }, 300);
          }
        }
      }


      scope.getInput = function() {
        var input = scope.dropdownSearchInputVal;
        userSearch.setData(input);

        if(mediaSearchSelect.value === "games") {
          $location.search("search", userSearch.getData());
          $location.path("/games/results/");
        }
        else if(mediaSearchSelect.value === "movies") {
          $location.search("search", userSearch.getData());
          $location.path("/movies/results/");
        }
        else if(mediaSearchSelect.value === "tv") {
          $location.search("search", userSearch.getData());
          $location.path("/tv/results/");
        }

        dropdownSearchInput.value = "";
        dropdownSearchInput.blur();
      }


// ________ EVENT HANDLERS
      scope.$on("$locationChangeStart", function(event) {
        if($location.path() === "/games/"
        || $location.path() === "/games/detail/"
        || $location.path() === "/games/results/") {
          clearMediaViewType();
          gameViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else if($location.path() === "/movies/"
        || $location.path() === "/movies/detail/"
        || $location.path() === "/movies/results/") {
          clearMediaViewType();
          movieViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else if($location.path() === "/tv/"
        || $location.path() === "/tv/detail/"
        || $location.path() === "/tv/results/") {
          clearMediaViewType();
          tvViewDropdownLink.style.borderBottom = "2px solid red";
        }

        else {
          clearMediaViewType();
        }
      });

// ---

      mediaSearchSelect.onchange = function() {
        if(mediaSearchSelect.value === "games") {
          dropdownSearchInput.placeholder = "enter a video game title...";
        }
        else if(mediaSearchSelect.value === "movies") {
          dropdownSearchInput.placeholder = "enter a movie title...";
        }
        else if(mediaSearchSelect.value === "tv") {
          dropdownSearchInput.placeholder = "enter a television show title...";
        }
      }


    }
  }
}]);

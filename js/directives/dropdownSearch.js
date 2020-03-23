app.directive("dropdownSearch", ["$location", "userSearch", function($location, userSearch) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var dropdownSearchActive = false;

      var searchToggleIconOpen = document.getElementsByClassName("search-toggle-icon-open");
      var searchToggleIconClose = document.getElementsByClassName("search-toggle-icon-close");

      var dropdownSearchContainer = document.getElementById("dropdown-search-container");
      var dropdownSearchInput = document.getElementById("dropdown-search-input");
      var mediaSearchSelect = document.getElementById("media-search-select");


// _____________ FUNCTIONS
      function expandDropdownSearch() {
        dropdownSearchContainer.classList.add("dropdown-nav-expand");

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
          retractDropdownSearch();

          dropdownSearchActive = false;
        }
        else if(dropdownSearchActive === false) {
          expandDropdownSearch();

          dropdownSearchActive = true;
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

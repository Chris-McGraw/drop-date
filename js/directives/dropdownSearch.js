app.directive("dropdownSearch", ["$location", function($location) {
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


    }
  }
}]);

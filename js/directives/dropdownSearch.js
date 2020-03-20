app.directive("dropdownSearch", ["$location", function($location) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var dropdownSearchActive = false;

      var dropdownSearchContainer = document.getElementById("dropdown-search-container");

// _____________ FUNCTIONS
      function expandDropdownSearch() {
        dropdownSearchContainer.classList.add("dropdown-nav-expand");
      }

      function retractDropdownSearch() {
        dropdownSearchContainer.classList.remove("dropdown-nav-expand");
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

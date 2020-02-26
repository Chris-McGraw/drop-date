app.directive("countrySelectChange", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var countrySelect = document.getElementById("country-select");


// _____________ FUNCTIONS
      countrySelect.onchange = function() {
        $route.reload();
      }


    }
  }
}]);

app.directive("activeFooter", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {

// _____________ FUNCTIONS
      element[0].ontouchstart = function() {
        this.classList.add("attr-link-highlight");
      };

      element[0].ontouchend = function() {
        this.classList.remove("attr-link-highlight");
      };


    }
  }
}]);

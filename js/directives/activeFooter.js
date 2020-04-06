app.directive("activeFooter", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      // var attrLink = document.getElementsByClassName("attr-link");


// _____________ FUNCTIONS
      // element[0].onmouseenter = function() {
      //   this.classList.add("test-style");
      // };
      //
      // element[0].onmouseleave = function() {
      //   this.classList.remove("test-style");
      // };

      element[0].ontouchstart = function() {
        this.classList.add("test-style");
      };

      element[0].ontouchend = function() {
        this.classList.remove("test-style");
      };


    }
  }
}]);

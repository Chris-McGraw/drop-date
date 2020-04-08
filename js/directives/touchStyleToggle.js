app.directive("touchStyleToggle", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {

// ________ EVENT HANDLERS
      element[0].ontouchstart = function() {
        if( this.classList.contains("navbar-page-link") || this.classList.contains("media-row-link") ) {
          this.classList.add("navbar-link-highlight");
        }
        else {
          this.classList.add("attr-link-highlight");
        }
      }


      element[0].ontouchend = function() {
        if( this.classList.contains("navbar-page-link") || this.classList.contains("media-row-link") ) {
          this.classList.remove("navbar-link-highlight");
        }
        else {
          this.classList.remove("attr-link-highlight");
        }
      }


    }
  }
}]);

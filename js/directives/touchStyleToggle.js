app.directive("touchStyleToggle", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {

// ________ EVENT HANDLERS
      element[0].ontouchstart = function() {
        if(this.children.length > 0) {
          if( this.children[0].classList.contains("dropdown-link-text") ) {
            this.children[0].classList.add("navbar-link-highlight");
          }
        }

        else if( this.classList.contains("navbar-page-link") || this.classList.contains("media-row-link") ) {
          this.classList.add("navbar-link-highlight");
        }
        else {
          this.classList.add("attr-link-highlight");
        }
      }


      element[0].ontouchend = function() {
        if(this.children.length > 0) {
          if( this.children[0].classList.contains("dropdown-link-text") ) {
            this.children[0].classList.remove("navbar-link-highlight");
          }
        }

        else if( this.classList.contains("navbar-page-link") || this.classList.contains("media-row-link") ) {
          this.classList.remove("navbar-link-highlight");
        }
        else {
          this.classList.remove("attr-link-highlight");
        }
      }


    }
  }
}]);

app.directive("touchStyleToggle", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {

// ________ EVENT HANDLERS
      element[0].ontouchstart = function() {
        if(this.children.length === 1
        && this.children[0].classList.contains("dropdown-link-text") ) {
          this.children[0].classList.add("navbar-link-highlight");
        }

        else if( this.children.length === 2
        && this.children[0].classList.contains("search-toggle-icon-open")
        && this.children[1].classList.contains("search-toggle-icon-close") ) {
          this.children[0].classList.add("navbar-link-highlight");
          this.children[1].children[0].classList.add("hamburger-highlight");
          this.children[1].children[2].classList.add("hamburger-highlight");
        }

        else if(this.id === "drop-date-logo") {
          this.classList.add("logo-highlight");
        }

        else if(this.id === "country-select") {
          this.classList.add("country-select-highlight");
        }

        else if(this.children.length === 3
        && this.id === "hamburger-menu") {
          this.children[0].classList.add("hamburger-highlight");
          this.children[1].classList.add("hamburger-highlight");
          this.children[2].classList.add("hamburger-highlight");
        }

        else if( this.classList.contains("navbar-page-link")
        || this.classList.contains("media-row-link") ) {
          this.classList.add("navbar-link-highlight");
        }

        else if( this.classList.contains("carousel-tile") ) {
          this.classList.add("carousel-tile-highlight");
        }

        else {
          this.classList.add("attr-link-highlight");
        }
      }


      element[0].ontouchend = function() {
        if(this.children.length === 1
        && this.children[0].classList.contains("dropdown-link-text") ) {
          this.children[0].classList.remove("navbar-link-highlight");
        }

        else if( this.children.length === 2
        && this.children[0].classList.contains("search-toggle-icon-open")
        && this.children[1].classList.contains("search-toggle-icon-close") ) {
          this.children[0].classList.remove("navbar-link-highlight");
          this.children[1].children[0].classList.remove("hamburger-highlight");
          this.children[1].children[2].classList.remove("hamburger-highlight");
        }

        else if(this.id === "drop-date-logo") {
          this.classList.remove("logo-highlight");
        }

        else if(this.id === "country-select") {
          this.classList.remove("country-select-highlight");
        }

        else if(this.children.length === 3
        && this.id === "hamburger-menu") {
          this.children[0].classList.remove("hamburger-highlight");
          this.children[1].classList.remove("hamburger-highlight");
          this.children[2].classList.remove("hamburger-highlight");
        }

        else if( this.classList.contains("navbar-page-link")
        || this.classList.contains("media-row-link") ) {
          this.classList.remove("navbar-link-highlight");
        }

        else if( this.classList.contains("carousel-tile") ) {
          this.classList.remove("carousel-tile-highlight");
        }

        else {
          this.classList.remove("attr-link-highlight");
        }
      }


    }
  }
}]);

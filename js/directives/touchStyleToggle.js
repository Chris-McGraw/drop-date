app.directive("touchStyleToggle", ["$route", function($route) {
  return {
    link: function(scope, element, attrs) {

// ________ EVENT HANDLERS
      element[0].ontouchstart = function() {
      // navbar dropdown link
        if(this.children.length === 1
        && this.children[0].classList.contains("dropdown-link-text") ) {
          this.children[0].classList.add("navbar-link-highlight");
        }
      // navbar dropdown search toggle button
        else if( this.children.length === 2
        && this.children[0].classList.contains("search-toggle-icon-open")
        && this.children[1].classList.contains("search-toggle-icon-close") ) {
          this.children[0].classList.add("navbar-link-highlight");
          this.children[1].children[0].classList.add("hamburger-highlight");
          this.children[1].children[2].classList.add("hamburger-highlight");
        }
      // navbar logo
        else if(this.id === "drop-date-logo") {
          this.classList.add("logo-highlight");
        }
      // navbar country select
        else if(this.id === "country-select") {
          this.classList.add("country-select-highlight");
        }
      // navbar dropdown navigation toggle button
        else if(this.children.length === 3
        && this.id === "hamburger-menu") {
          this.children[0].classList.add("hamburger-highlight");
          this.children[1].classList.add("hamburger-highlight");
          this.children[2].classList.add("hamburger-highlight");
        }
      // navbar link
      // media row title link
        else if( this.classList.contains("navbar-page-link")
        || this.classList.contains("media-row-link") ) {
          this.classList.add("navbar-link-highlight");
        }
      // feature hero image
        else if(this.children.length === 1
        && this.children[0].classList.contains("hero-media-img") ) {
          this.children[0].classList.add("carousel-tile-highlight");
        }
      // feature hero media name
      // feature hero media type
        else if( this.classList.contains("hero-media-name-link")
        || this.classList.contains("hero-media-type-link") ) {
          this.classList.add("navbar-link-highlight");
        }
      // carousel tile
        else if( this.classList.contains("carousel-tile") ) {
          this.classList.add("carousel-tile-highlight");
        }
      // feature hero scroll button
      // carousel tile scroll button
        else if( this.classList.contains("hero-scroll")
        || this.classList.contains("carousel-scroll") ) {
          this.classList.add("scroll-button-highlight");
        }
      // submit button
        else if( this.classList.contains("submit-btn") ) {
          this.classList.add("country-select-highlight");
        }

      // result tile
        else if( this.classList.contains("result-tile") ) {
          this.classList.add("logo-highlight");
        }

      // result page button
        else if( this.classList.contains("result-page-btn") ) {
          this.classList.add("result-page-btn-highlight");
        }

      // footer social link icon
        else if(this.children.length === 1
        && this.children[0].classList.contains("footer-link-icon") ) {
          this.children[0].classList.add("navbar-link-highlight");
        }
      // footer attribution link
        else {
          this.classList.add("attr-link-highlight");
        }
      }


      element[0].ontouchend = function() {
      // navbar dropdown link
        if(this.children.length === 1
        && this.children[0].classList.contains("dropdown-link-text") ) {
          this.children[0].classList.remove("navbar-link-highlight");
        }
      // navbar dropdown search toggle button
        else if( this.children.length === 2
        && this.children[0].classList.contains("search-toggle-icon-open")
        && this.children[1].classList.contains("search-toggle-icon-close") ) {
          this.children[0].classList.remove("navbar-link-highlight");
          this.children[1].children[0].classList.remove("hamburger-highlight");
          this.children[1].children[2].classList.remove("hamburger-highlight");
        }
      // navbar logo
        else if(this.id === "drop-date-logo") {
          this.classList.remove("logo-highlight");
        }
      // navbar country select
        else if(this.id === "country-select") {
          this.classList.remove("country-select-highlight");
        }
      // navbar dropdown navigation toggle button
        else if(this.children.length === 3
        && this.id === "hamburger-menu") {
          this.children[0].classList.remove("hamburger-highlight");
          this.children[1].classList.remove("hamburger-highlight");
          this.children[2].classList.remove("hamburger-highlight");
        }
      // navbar link
      // media row title link
        else if( this.classList.contains("navbar-page-link")
        || this.classList.contains("media-row-link") ) {
          this.classList.remove("navbar-link-highlight");
        }
      // feature hero image
        else if(this.children.length === 1
        && this.children[0].classList.contains("hero-media-img") ) {
          this.children[0].classList.remove("carousel-tile-highlight");
        }
      // feature hero media name
      // feature hero media type
        else if( this.classList.contains("hero-media-name-link")
        || this.classList.contains("hero-media-type-link") ) {
          this.classList.remove("navbar-link-highlight");
        }
      // carousel tile
        else if( this.classList.contains("carousel-tile") ) {
          this.classList.remove("carousel-tile-highlight");
        }
      // feature hero scroll button
      // carousel tile scroll button
        else if( this.classList.contains("hero-scroll")
        || this.classList.contains("carousel-scroll") ) {
          this.classList.remove("scroll-button-highlight");
        }
      // submit button
        else if( this.classList.contains("submit-btn") ) {
          this.classList.remove("country-select-highlight");
        }

      // result tile
        else if( this.classList.contains("result-tile") ) {
          this.classList.remove("logo-highlight");
        }

      // result page button
        else if( this.classList.contains("result-page-btn") ) {
          this.classList.remove("result-page-btn-highlight");
        }

      // footer social link icon
        else if(this.children.length === 1
        && this.children[0].classList.contains("footer-link-icon") ) {
          this.children[0].classList.remove("navbar-link-highlight");
        }
      // footer attribution link
        else {
          this.classList.remove("attr-link-highlight");
        }
      }


    }
  }
}]);

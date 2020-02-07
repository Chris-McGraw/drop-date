app.directive("mediaRow", ["fillMediaRow", "$location", function(fillMediaRow, $location) {
  return {
    restrict: "E",
    scope: {
      media:"@",
      type: "@",
      title: "@"
    },
    templateUrl: "js/directives/mediaRow.html",
    link: function(scope, element, attrs) {
      scope.rowTitle = scope.title;


// ____ ATTRIBUTE HANDLERS
      if(scope.media === "movies") {
        if(scope.type === "recent") {
          fillMediaRow.getRecentMovies().then(function(data) {
            scope.mediaList = data;
          });
        }

        else if(scope.type === "upcoming") {
          fillMediaRow.getUpcomingMovies().then(function(data) {
            scope.mediaList = data;
          });
        }
      }

// ---

      else if(scope.media === "tv") {
        if(scope.type === "recent") {
          fillMediaRow.getRecentTv().then(function(data) {
            scope.mediaList = data;
          });
        }

        else if(scope.type === "upcoming") {
          fillMediaRow.getUpcomingTv().then(function(data) {
            scope.mediaList = data;
          });
        }
      }

// ---

       else if(scope.media === "games") {
         if(scope.type === "recent") {
           fillMediaRow.getRecentGames().then(function(data) {
             scope.mediaList = data;
           });
         }

         else if(scope.type === "upcoming") {
           fillMediaRow.getUpcomingGames().then(function(data) {
             scope.mediaList = data;
           });
         }
       }

// ---

      else {
        console.log("error");
      }





// _____________ VARIABLES
      var carouselMain = document.getElementsByClassName("carousel-main");
      var carouselScrollLeft = document.getElementById("carousel-scroll-left");
      var carouselScrollRight = document.getElementById("carousel-scroll-right");
      var scrollLeft = document.getElementsByClassName("scroll-left");
      var scrollRight = document.getElementsByClassName("scroll-right");


// _____________ FUNCTIONS
      scope.checkCarouselOverflow = function() {
        for (i = 0; i < carouselMain.length; i++) {
          var carousel = carouselMain[i];

          if(carousel.scrollWidth - carousel.offsetWidth > 0) {
            scrollRight[i].style.display = "flex";
          }
          else {
            scrollRight[i].style.display = "none";
          }
        }
      }

// ---

      function toggleCarouselControls(carousel) {
        var scrollPos = carousel.scrollLeft;

        if(scrollPos === 0) {
          carousel.children[0].style.display = "none";
        }
        else {
          carousel.children[0].style.display = "flex";
        }

        if( scrollPos >= (carousel.scrollWidth - carousel.offsetWidth) ) {
          carousel.children[carousel.children.length - 1].style.display = "none";
        }
        else {
          carousel.children[carousel.children.length - 1].style.display = "flex";
        }
      }

// ---

      function toggleCarouselControlLeft(carousel, scrollLeft, scrollRight) {
        var scrollPos = carousel.scrollLeft;

        if(scrollPos === 0) {
          scrollLeft.style.display = "none";
        }
        else {
          scrollLeft.style.display = "flex";
        }

        if( scrollPos >= (carousel.scrollWidth - carousel.offsetWidth) ) {
          scrollRight.style.display = "none";
        }
        else {
          scrollRight.style.display = "flex";
        }
      }

// ---

      function toggleCarouselControlRight(carousel, scrollLeft, scrollRight) {
        var scrollPos = carousel.scrollLeft;

        if(scrollPos === 0) {
          scrollLeft.style.display = "none";
        }
        else {
          scrollLeft.style.display = "flex";
        }

        if( scrollPos >= (carousel.scrollWidth - carousel.offsetWidth) ) {
          scrollRight.style.display = "none";
        }
        else {
          scrollRight.style.display = "flex";
        }
      }


// ________ EVENT HANDLERS
      for (i = 0; i < scrollLeft.length; i++) {
        scrollLeft[i].onclick = function() {
          var carousel = this.parentElement;
          var scrollPos = carousel.scrollLeft;

          carousel.scroll(scrollPos - ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

          toggleCarouselControlLeft(carousel, this, this.parentElement.children[this.parentElement.children.length - 1]);
        };
      }

// ---

      for (i = 0; i < scrollRight.length; i++) {
        scrollRight[i].onclick = function() {
          var carousel = this.parentElement;
          var scrollPos = carousel.scrollLeft;

          carousel.scroll(scrollPos + ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

          toggleCarouselControlRight(carousel, this.parentElement.children[0], this);
        };
      }

// ---

      var debounceTimeout;

      window.onresize = function() {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(function() {
          for (i = 0; i < carouselMain.length; i++) {
            toggleCarouselControls(carouselMain[i]);
          }
        }, 100);
      }

      for (i = 0; i < carouselMain.length; i++) {
        carouselMain[i].onscroll = function() {
          clearTimeout(debounceTimeout);

          var thisCarousel = this;

          debounceTimeout = setTimeout(function() {
            toggleCarouselControls(thisCarousel);
          }, 100);
        };
      }

// ---

      var countrySelect = document.getElementById("country-select");

      countrySelect.onchange = function() {
        if($location.$$url === "/") {
          fillMediaRow.getRecentGames().then(function(data) {
            scope.$$prevSibling.$$prevSibling.mediaList = data;
          });

          fillMediaRow.getRecentMovies().then(function(data) {
            scope.$$prevSibling.mediaList = data;
          });

          fillMediaRow.getRecentTv().then(function(data) {
            scope.mediaList = data;
          });
        }

        else if($location.$$url === "/games/") {
          fillMediaRow.getRecentGames().then(function(data) {
            scope.$$prevSibling.mediaList = data;
          });

          fillMediaRow.getUpcomingGames().then(function(data) {
            scope.mediaList = data;
          });
        }

        else if($location.$$url === "/movies/") {
          fillMediaRow.getRecentMovies().then(function(data) {
            scope.$$prevSibling.mediaList = data;
          });

          fillMediaRow.getUpcomingMovies().then(function(data) {
            scope.mediaList = data;
          });
        }

        else if($location.$$url === "/tv/") {
          fillMediaRow.getRecentTv().then(function(data) {
            scope.$$prevSibling.mediaList = data;
          });

          fillMediaRow.getUpcomingTv().then(function(data) {
            scope.mediaList = data;
          });
        }
      }


    }
  };
}]);

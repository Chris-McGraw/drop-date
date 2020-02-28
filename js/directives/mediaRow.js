app.directive("mediaRow", ["fillMediaRow", function(fillMediaRow) {
  return {
    restrict: "E",
    scope: {
      media:"@",
      type: "@",
      title: "@"
    },
    templateUrl: "js/directives/mediaRow.html",
    link: function(scope, element, attrs) {


// _____________ VARIABLES
      scope.rowTitle = scope.title;
      var carouselMain = document.getElementsByClassName("carousel-main");


// _____________ FUNCTIONS
      scope.checkCarouselOverflow = function() {
        var carouselScrollRight = document.getElementsByClassName("scroll-right");

        for (i = 0; i < carouselMain.length; i++) {
          var carousel = carouselMain[i];

          if(carousel.scrollWidth - carousel.offsetWidth > 0) {
            carouselScrollRight[i].style.display = "flex";
          }
          else {
            carouselScrollRight[i].style.display = "none";
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

      scope.scrollCarouselLeft = function($event) {
        var carousel = $event.currentTarget.parentElement;
        var scrollPos = carousel.scrollLeft;

        carousel.scroll(scrollPos - ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

        toggleCarouselControls(carousel);
      }

// ---

      scope.scrollCarouselRight = function($event) {
        var carousel = $event.currentTarget.parentElement;
        var scrollPos = carousel.scrollLeft;

        carousel.scroll(scrollPos + ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

        toggleCarouselControls(carousel);
      }


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


// ________ EVENT HANDLERS
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


    }
  };
}]);

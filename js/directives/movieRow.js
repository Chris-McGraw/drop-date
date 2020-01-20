app.directive("movieRow", ["jsonPad", "movieApi", "localDate", "$filter", function(jsonPad, movieApi, localDate, $filter) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/movieRow.html",
    link: function(scope, element, attrs) {
      function backupImage() {
        angular.forEach(scope.movies, function(movie) {
          if(movie.poster_path === null) {
            movie.img_path = "../../imgs/movie-backup.png";
          }
          else {
            movie.img_path = "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          }
        });
      }

      if(scope.type === "movies") {
        scope.rowTitle = "Movies";

        jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.movies = response.data.results;

            backupImage();
        });
      }

      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.movies = response.data.results;

            backupImage();
        });
      }

      else if(scope.type === "upcoming") {
        scope.rowTitle = "Upcoming";

        jsonPad.getData( movieApi.upcomingUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            var greaterThan = function(prop, val) {
              return function(item) {
                return item[prop] >= val;
              }
            }

            var upcomingMovies = $filter("filter")(response.data.results, greaterThan("release_date", localDate.getTomorrowDate() ));
            scope.movies = $filter("orderBy")(upcomingMovies, "release_date");

            backupImage();
        });
      }

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


    }
  };
}]);

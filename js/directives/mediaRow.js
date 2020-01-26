app.directive("mediaRow", ["jsonPad", "movieApi", "tvApi", "gameApi", "localDate", "$filter", function(jsonPad, movieApi, tvApi, gameApi, localDate, $filter) {
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
        function movieIdPath(movie) {
          movie.idPath = "#/movies/detail/?id=" + movie.id;
          // console.log(movie.idPath);
        }

        function backupMovieImages(movie) {
          if(movie.poster_path === null) {
            movie.imgPath = "../../imgs/movie-backup.png";
          }
          else {
            movie.imgPath = "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          }
        }

      // ---

        if(scope.type === "recent") {
          jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
            function successCallback(response) {
              var lessThan = function(prop, val) {
                return function(item) {
                  return item[prop] <= val;
                }
              }

              var recentMovies = $filter("filter")(response.data.results, lessThan("release_date", localDate.getCurrentDate() ));
              scope.mediaList = $filter("orderBy")(recentMovies, "release_date", reverse = true);

              angular.forEach(scope.mediaList, function(movie) {
                movieIdPath(movie);
                backupMovieImages(movie);
              });
          });
        }

        else if(scope.type === "upcoming") {
          jsonPad.getData( movieApi.upcomingUrl(), movieApi.callback() ).then(
            function successCallback(response) {
              var greaterThan = function(prop, val) {
                return function(item) {
                  return item[prop] >= val;
                }
              }

              var upcomingMovies = $filter("filter")(response.data.results, greaterThan("release_date", localDate.getTomorrowDate() ));
              scope.mediaList = $filter("orderBy")(upcomingMovies, "release_date");

              angular.forEach(scope.mediaList, function(movie) {
                movieIdPath(movie);
                backupMovieImages(movie);
              });
          });
        }
      }

// ---

      else if(scope.media === "tv") {
        function tvIdPath(show) {
          show.idPath = "#/tv/detail/?id=" + show.id;
        }

        function backupTvImages(show) {
          if(show.poster_path === null) {
            show.imgPath = "../../imgs/tv-backup.png";
          }
          else {
            show.imgPath = "http://image.tmdb.org/t/p/w185" + show.poster_path;
          }
        }

        function tvTitle(show) {
          show.title = show.name;
        }

        function tvRelease(show) {
          show.release_date = show.first_air_date;
        }

      // ---

        if(scope.type === "recent") {
          jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
            function successCallback(response) {
              scope.mediaList = response.data.results;

              angular.forEach(scope.mediaList, function(show) {
                tvIdPath(show);
                backupTvImages(show);
                tvTitle(show);
                tvRelease(show);
              });
          });
        }

        else if(scope.type === "upcoming") {
          jsonPad.getData( tvApi.upcomingUrl(), tvApi.callback() ).then(
            function successCallback(response) {
              var upcomingTv = response.data.results;

              scope.mediaList = $filter("orderBy")(upcomingTv, "first_air_date");

              angular.forEach(scope.mediaList, function(show) {
                tvIdPath(show);
                backupTvImages(show);
                tvTitle(show);
                tvRelease(show);
              });
          });
        }
      }

// ---

       else if(scope.media === "games") {
         function gameIdPath(game) {
           game.idPath = "#/games/detail/?id=" + game.id;
         }

         function backupGameImages(game) {
           if(game.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
             game.imgPath = "../../imgs/game-backup.png";
           }
           else {
             game.imgPath = game.image.small_url;
           }
         }

         function gameTitle(game) {
           game.title = game.name;
         }

         function formatDate(game) {
           game.release_date = new Date(game.expected_release_year + "/" + game.expected_release_month + "/" + game.expected_release_day);
         }

         // ---

         if(scope.type === "recent") {
           jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
             function successCallback(response) {
               scope.mediaList = $filter("filter")(response.data.results, {expected_release_year:"",
                 expected_release_month:"",
                 expected_release_day:""}
               );

               angular.forEach(scope.mediaList, function(game) {
                 gameIdPath(game);
                 backupGameImages(game);
                 gameTitle(game);
                 formatDate(game);
               });
           });
         }

         else if(scope.type === "upcoming") {
           jsonPad.getData( gameApi.upcomingUrl(), gameApi.callback() ).then(
             function successCallback(response) {
               scope.mediaList = $filter("filter")(response.data.results, {expected_release_year:"",
                 expected_release_month:"",
                 expected_release_day:""}
               );

               angular.forEach(scope.mediaList, function(game) {
                 gameIdPath(game);
                 backupGameImages(game);
                 gameTitle(game);
                 formatDate(game);
               });
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


    }
  };
}]);

app.directive("castRow", ["jsonPad", "movieApi", "tvApi", "gameApi", "carouselScrollDelay", function(jsonPad, movieApi, tvApi, gameApi, carouselScrollDelay) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/castRow.html",
    link: function(scope, element, attrs) {


// _____________ VARIABLES
      var castCarousel = document.getElementById("cast-carousel");
      var carouselScrollRight = document.getElementById("carousel-scroll-right");


// _____________ FUNCTIONS
      function backupImage() {
        angular.forEach(scope.castList, function(cast) {
          if(cast.profile_path === null) {
            cast.img_path = "imgs/cast-backup.png";
          }
          else {
            cast.img_path = "http://image.tmdb.org/t/p/w185" + cast.profile_path;
          }
        });
      }

// ---

      scope.checkCarouselOverflow = function() {
        if(castCarousel.scrollWidth - castCarousel.offsetWidth > 0) {
          carouselScrollRight.style.display = "flex";
        }
        else {
          carouselScrollRight.style.display = "none";
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
        if(carouselScrollDelay.scrollStatus() === true) {
          var carousel = $event.currentTarget.parentElement;
          var scrollPos = carousel.scrollLeft;

          carousel.scroll(scrollPos - ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

          toggleCarouselControls(carousel);
        }
      }

// ---

      scope.scrollCarouselRight = function($event) {
        if(carouselScrollDelay.scrollStatus() === true) {
          var carousel = $event.currentTarget.parentElement;
          var scrollPos = carousel.scrollLeft;

          carousel.scroll(scrollPos + ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

          toggleCarouselControls(carousel);
        }
      }


// ____ ATTRIBUTE HANDLERS
      if(scope.type === "movies") {
        scope.rowTitle = "Cast";

        jsonPad.getData( movieApi.castUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            if(response.data.cast === null || response.data.cast === undefined || response.data.cast === "" || response.data.cast.length === 0) {
              document.getElementById("carousel-results-none").style.display = "block";
            }
            else {
              document.getElementById("carousel-results-none").style.display = "none";

              scope.castList = response.data.cast;

              backupImage();
            }
        });
      }

// ---

      else if(scope.type === "tv") {
        scope.rowTitle = "Cast";

        jsonPad.getData( tvApi.castUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            if(response.data.cast === null || response.data.cast === undefined || response.data.cast === "" || response.data.cast.length === 0) {
              document.getElementById("carousel-results-none").style.display = "block";
            }
            else {
              document.getElementById("carousel-results-none").style.display = "none";

              scope.castList = response.data.cast;

              backupImage();
            }
        });
      }

// ---

      else if(scope.type === "games") {
        scope.rowTitle = "Characters";

        function getGameCharacters(response) {
          var charIdArray = [];

          if(response.data.results.characters === null || response.data.results.characters === undefined || response.data.results.characters === "" || response.data.results.characters.length === 0) {
            charIdArray = [];
          }
          else {
            for(i = 0; i < 10; i++) {
              if(i === response.data.results.characters.length) {
                break;
              }
              else {
                charIdArray.push(response.data.results.characters[i].id + "|");
              }
            }
          }

          return charIdArray;
        }

        function backupGameCastImage(cast) {
          if( cast.image.small_url.includes("gb_default") ) {
            cast.img_path = "imgs/cast-backup.png";
          }
          else {
            cast.img_path = cast.image.small_url;
          }
        }


        jsonPad.getData( gameApi.detailUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            getGameCharacters(response);

            if(getGameCharacters(response).length === 0) {
              document.getElementById("carousel-results-none").style.display = "block";
            }
            else {
              document.getElementById("carousel-results-none").style.display = "none";

              jsonPad.getData( gameApi.characterUrl( getGameCharacters(response).join("") ), gameApi.callback() ).then(
                function successCallback(response) {
                  scope.castList = response.data.results;

                  angular.forEach(scope.castList, function(cast) {
                    backupGameCastImage(cast);

                    cast.character = cast.real_name;
                  });
              });
            }
        });
      }


// ________ EVENT HANDLERS
      var debounceTimeout;

      window.onresize = function() {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(function() {
          toggleCarouselControls(castCarousel);
        }, 100);
      }

      castCarousel.onscroll= function() {
        clearTimeout(debounceTimeout);

        carouselScrollDelay.preventScroll();

        debounceTimeout = setTimeout(function() {
          carouselScrollDelay.allowScroll();

          toggleCarouselControls(castCarousel);
        }, 100);
      };


    }
  };
}]);

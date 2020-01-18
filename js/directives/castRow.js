app.directive("castRow", ["jsonPad", "movieApi", "tvApi", function(jsonPad, movieApi, tvApi) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/castRow.html",
    link: function(scope, element, attrs) {


// _____________ VARIABLES
      var carousel = document.getElementById("sliding-carousel");
      var carouselSlideLeft = document.getElementById("carousel-slide-left");
      var carouselSlideRight = document.getElementById("carousel-slide-right");


// _____________ FUNCTIONS
      function backupImage() {
        angular.forEach(scope.castList, function(cast) {
          if(cast.profile_path === null) {
            cast.img_path = "../../imgs/cast-backup.png";
          }
          else {
            cast.img_path = "http://image.tmdb.org/t/p/w185" + cast.profile_path;
          }
        });
      }

// ---

      scope.checkCarouselOverflow = function() {
        if(carousel.scrollWidth - carousel.offsetWidth > 0) {
          carouselSlideRight.style.display = "flex";
        }
        else {
          carouselSlideRight.style.display = "none";
        }
      }

// ---

      function toggleCarouselControls() {
        var scrollPos = carousel.scrollLeft;

        if(scrollPos === 0) {
          carouselSlideLeft.style.display = "none";
        }
        else {
          carouselSlideLeft.style.display = "flex";
        }

        if( scrollPos >= (carousel.scrollWidth - carousel.offsetWidth) ) {
          carouselSlideRight.style.display = "none";
        }
        else {
          carouselSlideRight.style.display = "flex";
        }
      }


// ____ ATTRIBUTE HANDLERS
      if(scope.type === "movies") {
        jsonPad.getData( movieApi.castUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            if(response.data.cast === null || response.data.cast === undefined || response.data.cast === "" || response.data.cast.length === 0) {
              document.getElementById("test-result").style.display = "block";
            }
            else {
              document.getElementById("test-result").style.display = "none";

              scope.castList = response.data.cast;

              backupImage();
            }
        });
      }

      else if(scope.type === "tv") {
        jsonPad.getData( tvApi.castUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            if(response.data.cast === null || response.data.cast === undefined || response.data.cast === "" || response.data.cast.length === 0) {
              document.getElementById("test-result").style.display = "block";
            }
            else {
              document.getElementById("test-result").style.display = "none";

              scope.castList = response.data.cast;

              backupImage();
            }
        });
      }


// ________ EVENT HANDLERS
      carouselSlideLeft.onclick = function() {
        var scrollPos = carousel.scrollLeft;
        carousel.scroll(scrollPos - ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

        toggleCarouselControls();
      };

// ---

      carouselSlideRight.onclick = function() {
        var scrollPos = carousel.scrollLeft;
        carousel.scroll(scrollPos + ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

        toggleCarouselControls();
      };

// ---

      var debounceTimeout;

      window.onresize = function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(toggleCarouselControls, 100);
      }


    }
  };
}]);

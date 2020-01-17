app.directive("castRow", ["jsonPad", "movieApi", "tvApi", function(jsonPad, movieApi, tvApi) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/castRow.html",
    link: function(scope, element, attrs) {

// -----

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

// -----

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


// TEMP CLICK SCROLL VARIABLES
            var carousel = document.getElementById("sliding-carousel");
            var currentCarouselPos = 0;
            var carouselSlideLeft = document.getElementById("carousel-slide-left");
            var carouselSlideRight = document.getElementById("carousel-slide-right");

// TEMP CLICK SCROLL LEFT FUNCTIONALITY
            carouselSlideLeft.onclick = function() {
              currentCarouselPos = carousel.scrollLeft;

              carousel.scroll(currentCarouselPos - ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

              if(carousel.scrollLeft === 0) {
                carouselSlideLeft.style.display = "none";
              }
              else {
                carouselSlideLeft.style.display = "flex";
              }

              if( carousel.scrollLeft >= (carousel.scrollWidth - carousel.offsetWidth) ) {
                carouselSlideRight.style.display = "none";
              }
              else {
                carouselSlideRight.style.display = "flex";
              }
            };

// TEMP CLICK SCROLL RIGHT FUNCTIONALITY
            carouselSlideRight.onclick = function() {
              currentCarouselPos = carousel.scrollLeft;

              carousel.scroll(currentCarouselPos + ( 160 * Math.floor(carousel.offsetWidth / 160) ), 0);

              if(carousel.scrollLeft === 0) {
                carouselSlideLeft.style.display = "none";
              }
              else {
                carouselSlideLeft.style.display = "flex";
              }

              if( carousel.scrollLeft >= (carousel.scrollWidth - carousel.offsetWidth) ) {
                carouselSlideRight.style.display = "none";
              }
              else {
                carouselSlideRight.style.display = "flex";
              }
            };


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

// -----

    }
  };
}]);

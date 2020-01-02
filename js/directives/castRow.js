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
            cast.img_path = "../../imgs/movie-backup.png";
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
            scope.castList = response.data.cast;

            backupImage();
        });
      }

      else if(scope.type === "tv") {
        jsonPad.getData( tvApi.castUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.castList = response.data.cast;

            backupImage();
        });
      }

// -----

    }
  };
}]);
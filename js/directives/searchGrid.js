app.directive("searchGrid", ["jsonPad", "gameApi", "movieApi", "userSearch", "$location", function(jsonPad, gameApi, movieApi, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/searchGrid.html",
    link: function(scope, element, attrs) {
      userSearch.setQuery( $location.search().search );

// -----

      if(scope.type === "games") {
        function resultLink() {
          angular.forEach(scope.results, function(result) {
            result.link = "#/games/detail/?id=" + result.id;
          });
        }

        function backupImage() {
          angular.forEach(scope.results, function(result) {
            if(result.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
              result.img_path = "../../imgs/game-backup.png";
            }
            else {
              result.img_path = result.image.small_url;
            }
          });
        }

        function formatDate() {
          angular.forEach(scope.results, function(result) {
            result.release_date = new Date(result.expected_release_year + "/" + result.expected_release_month + "/" + result.expected_release_day);
          });
        }

        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.results = response.data.results;

            resultLink();
            backupImage();
            formatDate();
        });
      }

// -----

      else if(scope.type === "movies") {
        function resultLink() {
          angular.forEach(scope.results, function(result) {
            result.link = "#/movies/detail/?id=" + result.id;
          });
        }

        function backupImage() {
          angular.forEach(scope.results, function(result) {
            if(result.poster_path === null) {
              result.img_path = "../../imgs/movie-backup.png";
            }
            else {
              result.img_path = "http://image.tmdb.org/t/p/w185" + result.poster_path;
            }
          });
        }

        function formatName() {
          angular.forEach(scope.results, function(result) {
            result.name = result.title;
          });
        }

        jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.results = response.data.results;

            resultLink();
            backupImage();
            formatName();
        });
      }

// -----

      else {
        console.log("error");
      }

    }
  };
}]);

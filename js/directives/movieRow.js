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
            scope.movies = $filter("orderBy")(response.data.results, "release_date", "reverse");

            backupImage();
        });
      }

      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.movies = $filter("orderBy")(response.data.results, "release_date", "reverse");

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
    }
  };
}]);

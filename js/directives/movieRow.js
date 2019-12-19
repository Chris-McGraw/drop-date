app.directive("movieRow", ["jsonPad", "movieApi", "localDate", "$filter", function(jsonPad, movieApi, localDate, $filter) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/movieRow.html",
    link: function(scope, element, attrs) {

      if(scope.type === "movies") {
        scope.rowTitle = "Movies";

        jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.movies = response.data.results;
        });
      }
      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.movies = response.data.results;
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
        });
      }
      else {
        console.log("broke it");
      }

    }
  };
}]);

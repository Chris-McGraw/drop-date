app.directive("tvRow", ["jsonPad", "tvApi", "localDate", function(jsonPad, tvApi, localDate) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/tvRow.html",
    link: function(scope, element, attrs) {
      function backupImage() {
        angular.forEach(scope.shows, function(show) {
          if(show.poster_path === null) {
            show.img_path = "../../imgs/tv-backup.png";
          }
          else {
            show.img_path = "http://image.tmdb.org/t/p/w185" + show.poster_path;
          }
        });
      }

      if(scope.type === "tv") {
        scope.rowTitle = "Television";

        jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;

            backupImage();
        });
      }

      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;

            backupImage();
        });
      }

      else if(scope.type === "upcoming") {
        scope.rowTitle = "Upcoming";

        jsonPad.getData( tvApi.upcomingUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;

            backupImage();
        });
      }

      else {
        console.log("error");
      }
    }
  };
}]);

app.directive("gameRow", ["jsonPad", "gameApi", "localDate", function(jsonPad, gameApi, localDate) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/gameRow.html",
    link: function(scope, element, attrs) {

      if(scope.type === "games") {
        scope.rowTitle = "Video Games";

        jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = response.data.results;
        });
      }
      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = response.data.results;
        });
      }
      else if(scope.type === "upcoming") {
        scope.rowTitle = "Upcoming";

        jsonPad.getData( gameApi.upcomingUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = response.data.results;
        });
      }
      else {
        console.log("broke it");
      }

    }
  };
}]);

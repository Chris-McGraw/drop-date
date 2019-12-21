app.directive("gameRow", ["jsonPad", "gameApi", "localDate", "$filter", function(jsonPad, gameApi, localDate, $filter) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/gameRow.html",
    link: function(scope, element, attrs) {
      function formatDate() {
        angular.forEach(scope.games, function(game) {
          game.release_date = new Date(game.expected_release_year + "/" + game.expected_release_month + "/" + game.expected_release_day);
        });
      }

      if(scope.type === "games") {
        scope.rowTitle = "Video Games";

        jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = response.data.results;

            formatDate();
        });
      }

      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = response.data.results;

            formatDate();
        });
      }

      else if(scope.type === "upcoming") {
        scope.rowTitle = "Upcoming";

        jsonPad.getData( gameApi.upcomingUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.games = $filter("filter")(response.data.results, {expected_release_year:"",
              expected_release_month:"",
              expected_release_day:""}
            );

            formatDate();
        });
      }

      else {
        console.log("error");
      }

    }
  };
}]);

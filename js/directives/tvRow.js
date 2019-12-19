app.directive("tvRow", ["jsonPad", "tvApi", "localDate", function(jsonPad, tvApi, localDate) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/tvRow.html",
    link: function(scope, element, attrs) {

      if(scope.type === "tv") {
        scope.rowTitle = "Television";

        jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;
        });
      }
      else if(scope.type === "recent") {
        scope.rowTitle = "Recent";

        jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;
        });
      }
      else if(scope.type === "upcoming") {
        scope.rowTitle = "Upcoming";

        jsonPad.getData( tvApi.upcomingUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.shows = response.data.results;
        });
      }
      else {
        console.log("broke it");
      }

    }
  };
}]);

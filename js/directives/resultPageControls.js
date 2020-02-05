app.directive("searchGrid", ["jsonPad", "gameApi", "movieApi", "tvApi", "userSearch", "$location", function(jsonPad, gameApi, movieApi, tvApi, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/searchGrid.html",
    link: function(scope, element, attrs) {

// _____________ VARIABLES


// _____________ FUNCTIONS


// ____ ATTRIBUTE HANDLERS
      if(scope.type === "games") {
        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
        });
      }


    }
  };
}]);

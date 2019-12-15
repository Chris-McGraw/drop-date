app.directive('recentReleaseRow', ["jsonPad", "localDate", function(jsonPad, localDate) {
  return {
    restrict: 'E',
    scope: {
      rowTitle: '=',
      releaseUrl: '=',
      callback: '='
    },
    templateUrl: 'js/directives/recentReleaseRow.html',
    link: function(scope, element, attrs) {

      jsonPad.getData(scope.releaseUrl, scope.callback).then(
        function successCallback(response) {
          scope.games = response.data.results;
      });

    }
  };
}]);

app.directive('recentReleaseRow', ["jsonPadApi", "localDate", function(jsonPadApi, localDate) {
  return {
    restrict: 'E',
    scope: {
      rowTitle: '=',
      baseUrl: '=',
      key: '=',
      endUrl: '=',
      callback: '='
    },
    templateUrl: 'js/directives/recentReleaseRow.html',
    link: function(scope, element, attrs) {

      jsonPadApi.getData(scope.baseUrl, scope.key, scope.endUrl, scope.callback).then(
        function successCallback(response) {
          scope.games = response.data.results;
      });

    }
  };
}]);

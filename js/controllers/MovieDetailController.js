app.controller("MovieDetailController", ["$scope", "jsonPad", "movieApi", "$routeParams", function($scope, jsonPad, movieApi, $routeParams) {
  $scope.title = "Current View : Movie Detail";

// ---------------------- DETAILS
  jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];
  });
}]);

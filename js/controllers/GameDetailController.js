app.controller("GameDetailController", ["$scope", "jsonPad", "gameApi", "$routeParams", function($scope, jsonPad, gameApi, $routeParams) {
  $scope.title = "Current View : Detail";

// ---------------------- DETAILS
  jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];
  });
}]);

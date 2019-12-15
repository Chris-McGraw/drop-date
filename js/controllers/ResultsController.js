app.controller("ResultsController", ["$scope", "jsonPad", "gameApi", function($scope, jsonPad, gameApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;
  });
}]);

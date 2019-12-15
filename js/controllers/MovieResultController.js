app.controller("MovieResultController", ["$scope", "jsonPad", "movieApi", function($scope, jsonPad, movieApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;
  });
}]);

app.controller("TvResultController", ["$scope", "jsonPad", "tvApi", function($scope, jsonPad, tvApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;
  });
}]);

app.controller("TvDetailController", ["$scope", "jsonPad", "tvApi", "$routeParams", function($scope, jsonPad, tvApi, $routeParams) {
  $scope.title = "Current View : TV Detail";

// ---------------------- DETAILS
  jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];
  });
}]);

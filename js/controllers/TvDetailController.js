app.controller("TvDetailController", ["$scope", "jsonPad", "tvApi", "$routeParams", function($scope, jsonPad, tvApi, $routeParams) {
  $scope.title = "Current View : TV Detail";

// ---------------------- DETAILS
  jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];

      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/tv-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w185" + $scope.detail.poster_path;
      }
  });
}]);

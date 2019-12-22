app.controller("GameDetailController", ["$scope", "jsonPad", "gameApi", "$routeParams", function($scope, jsonPad, gameApi, $routeParams) {
  $scope.title = "Current View : Detail";

// ---------------------- DETAILS
  jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];

      if($scope.detail.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
        $scope.detail.img_path = "../../imgs/game-backup.png";
      }
      else {
        $scope.detail.img_path = $scope.detail.image.small_url;
      }
  });
}]);

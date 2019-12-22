app.controller("GameResultController", ["$scope", "jsonPad", "gameApi", function($scope, jsonPad, gameApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;

      angular.forEach($scope.results, function(game) {
        if(game.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
          game.img_path = "../../imgs/game-backup.png";
        }
        else {
          game.img_path = game.image.small_url;
        }
      });
  });
}]);

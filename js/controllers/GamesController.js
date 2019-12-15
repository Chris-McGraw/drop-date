app.controller("GamesController", ["$scope", "gameApi", "userSearch", "$location", function($scope, gameApi, userSearch, $location) {
  $scope.title = "Current View : Games";
  $scope.buttonText = "Search";

  $scope.releaseUrl = gameApi.releaseUrl();
  $scope.callback = gameApi.callback();

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.path("/games/results/");
  }
}]);

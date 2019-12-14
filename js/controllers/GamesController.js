app.controller("GamesController", ["$scope", "giantBombApi", "userSearch", "$location", function($scope, giantBombApi, userSearch, $location) {
  $scope.title = "Current View : Games";
  $scope.buttonText = "Search";

  $scope.baseUrl = giantBombApi.baseUrl();
  $scope.key = giantBombApi.key();
  $scope.endUrl = giantBombApi.endUrl();
  $scope.callback = giantBombApi.callback();

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.path("/games/results/");
  }
}]);

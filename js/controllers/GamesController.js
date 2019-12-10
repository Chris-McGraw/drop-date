app.controller("GamesController", ["$scope", "userSearch", "$location", function($scope, userSearch, $location) {
  $scope.title = "Current View : Games";
  $scope.page = "games";
  // $scope.buttonText = "Search";
  //
  // $scope.getInput = function() {
  //   var input = $scope.inputVal;
  //   userSearch.setData(input);
  //
  //   $location.path("/games/results/");
  // }
}]);

app.controller("GamesController", ["$scope", "userSearch", function($scope, userSearch) {
  $scope.title = "Current View : Games";
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);
  }
}]);

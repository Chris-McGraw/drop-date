app.controller("GameController", ["$scope", "userSearch", "$location", function($scope, userSearch, $location) {
  $scope.title = "Current View : Games";
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/games/results/");
  }
}]);

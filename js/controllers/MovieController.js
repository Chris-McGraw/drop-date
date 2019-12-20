app.controller("MovieController", ["$scope", "userSearch", "$location", function($scope, userSearch, $location) {
  $scope.title = "Current View : Movies";
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.path("/movies/results/");
  }
}]);

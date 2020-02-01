app.controller("TvController", ["$scope", "userSearch", "$location", function($scope, userSearch, $location) {
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/tv/results/");
  }
}]);

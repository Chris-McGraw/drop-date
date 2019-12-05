app.controller("MainController", ["$scope", "userSearch", function($scope, userSearch) {
  $scope.title = "Current View : Home";
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);
  }
}]);

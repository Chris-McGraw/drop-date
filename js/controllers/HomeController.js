app.controller("HomeController", ["$scope", function($scope) {
  $scope.title = "Current View : Home";
  $scope.buttonText = "Games";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);
  }
}]);

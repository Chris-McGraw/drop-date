app.controller("MoviesController", ["$scope", "userSearch", "$location", function($scope, userSearch, $location) {
  $scope.title = "Current View : Movies";
  $scope.page = "movies";
}]);

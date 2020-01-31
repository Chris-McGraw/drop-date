app.controller("MovieResultController", ["$scope", "$location", function($scope, $location) {
  $scope.title = "Movie Search";
  $scope.subtitle = "Results For:";

  $scope.searchQuery = $location.search().search;
}]);

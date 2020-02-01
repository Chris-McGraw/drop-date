app.controller("MovieResultController", ["$scope", "$location", function($scope, $location) {
  $scope.searchQuery = $location.search().search;
}]);

app.controller("TvResultController", ["$scope", "$location", function($scope, $location) {
  $scope.searchQuery = $location.search().search;
}]);

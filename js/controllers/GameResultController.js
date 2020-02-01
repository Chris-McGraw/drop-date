app.controller("GameResultController", ["$scope", "$location", function($scope, $location) {
  $scope.searchQuery = $location.search().search;
}]);

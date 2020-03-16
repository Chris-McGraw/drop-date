app.controller("TvResultController", ["$scope", "$location", "userSearch", function($scope, $location, userSearch) {
  $scope.searchQuery = $location.search().search;

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.url($location.path());

    $location.search("search", userSearch.getData());
    $location.path("/tv/results/");
  }


}]);

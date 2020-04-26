app.controller("MovieResultController", ["$scope", "$location", "userSearch", function($scope, $location, userSearch) {
// ________ SERVICE SET UP
  $scope.searchQuery = $location.search().search;


// _____________ FUNCTIONS
  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.url($location.path());

    $location.search("search", userSearch.getData());
    $location.path("/movies/results/");
  }


}]);

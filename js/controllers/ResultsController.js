app.controller("ResultsController", ["$scope", "userSearch", "photos", function($scope, userSearch, photos) {
  $scope.title = "Current View : Results";

  photos.getData( userSearch.getData() ).then(
    function successCallback(response) {
    $scope.dingus = response.data.results;
    //console.log(response.data.results);
  });
}]);

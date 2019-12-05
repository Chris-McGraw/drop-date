app.controller("SecondController", ["$scope", "userSearch", "photos", function($scope, userSearch, photos) {
  $scope.title = "Current View : Second";

  photos.getData( userSearch.getData() ).then(
    function successCallback(response) {
    $scope.dingus = response.data.results;
    //console.log(response.data.results);
  });
}]);

app.controller("SecondController", ["$scope", "photos", function($scope, photos) {
  $scope.title = "Current View : Second";

  photos.then(
    function successCallback(response) {
    $scope.dingus = response.data.results;
    //console.log(response.data.results);
  });
}]);

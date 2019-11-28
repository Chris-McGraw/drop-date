app.controller("SecondController", ["$scope", "photos", function($scope, photos) {
  $scope.title = "Current View : Second";
  $scope.buttonText = "Change View";

  photos.then(
    function successCallback(response) {
    $scope.dingus = response.data;
  });
}]);

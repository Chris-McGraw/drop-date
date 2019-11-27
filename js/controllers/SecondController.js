app.controller("SecondController", ["$scope", "photos", function($scope, photos) {
  $scope.title = "Current View : Second";
  $scope.buttonText = "Change View";

  // photos.success(function(data) {
  //   $scope.photos = data;
  // });

  function successCallback(data){
      $scope.photos = data;
  }

}]);

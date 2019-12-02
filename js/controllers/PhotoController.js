app.controller("PhotoController", ["$scope", "photos", "$routeParams", function($scope, photos, $routeParams) {
  $scope.title = "Current View : Photo";

  photos.then(
    function successCallback(response) {
    $scope.detail = response.data.results[$routeParams.id];
  });
}]);

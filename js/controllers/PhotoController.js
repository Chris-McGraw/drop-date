app.controller("PhotoController", ["$scope", "userSearch", "photos", "$routeParams", function($scope, userSearch, photos, $routeParams) {
  $scope.title = "Current View : Photo";

  photos.getData( userSearch.getData() ).then(
    function successCallback(response) {
    $scope.detail = response.data.results[$routeParams.id];
  });
}]);

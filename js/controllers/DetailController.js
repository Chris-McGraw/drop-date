app.controller("DetailController", ["$scope", "userSearch", "photos", "$routeParams", function($scope, userSearch, photos, $routeParams) {
  $scope.title = "Current View : Detail";

  photos.getData( userSearch.getData() ).then(
    function successCallback(response) {
    $scope.detail = response.data.results[$routeParams.id];
  });
}]);

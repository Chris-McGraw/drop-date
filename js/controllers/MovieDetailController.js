app.controller("MovieDetailController", ["$scope", "jsonPad", "movieApi", "$routeParams", function($scope, jsonPad, movieApi, $routeParams) {
  $scope.title = "Current View : Movie Detail";

// ---------------------- DETAILS
  jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];

      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/movie-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w185" + $scope.detail.poster_path;
      }
  });
}]);

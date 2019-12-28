app.controller("MovieDetailController", ["$scope", "jsonPad", "movieApi", "userSearch", "$location", function($scope, jsonPad, movieApi, userSearch, $location) {
  $scope.title = "Current View : Movie Detail";

  userSearch.setDetail( $location.search().id );

// ---------------------- DETAILS
  jsonPad.getData( movieApi.detailUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data;

      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/movie-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w185" + $scope.detail.poster_path;
      }
  });
}]);

app.controller("TvDetailController", ["$scope", "jsonPad", "tvApi", "userSearch", "$location", function($scope, jsonPad, tvApi, userSearch, $location) {
  $scope.title = "Current View : TV Detail";

  userSearch.setDetail( $location.search().id );

// ---------------------- DETAILS
  jsonPad.getData( tvApi.detailUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data;
      $scope.production = response.data.production_companies;
      $scope.genres = response.data.genres;

      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/tv-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w185" + $scope.detail.poster_path;
      }
  });
}]);

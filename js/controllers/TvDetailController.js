app.controller("TvDetailController", ["$scope", "jsonPad", "tvApi", "userSearch", "colorPalette", "$location", function($scope, jsonPad, tvApi, userSearch, colorPalette, $location) {
  $scope.title = "Current View : TV Detail";

  userSearch.setDetail( $location.search().id );

// ---------------------- DETAILS
  jsonPad.getData( tvApi.detailUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data;
      $scope.production = response.data.production_companies;
      $scope.genres = response.data.genres;

// ____ IMAGE BACKUP
      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/tv-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w500" + $scope.detail.poster_path;
      }

// _ BACKDROP BACKUP
      if($scope.detail.backdrop_path === null) {
        if($scope.detail.poster_path !== null) {
          $scope.detail.backdrop = $scope.detail.img_path;
        }
        else {
          $scope.detail.backdrop = "../imgs/tv-backup.png";
        }
      }
      else {
        $scope.detail.backdrop = "http://image.tmdb.org/t/p/w500" + $scope.detail.backdrop_path;
      }

      document.getElementById("detail-img-background").style.backgroundImage = "url(" + $scope.detail.backdrop + ")";

// ___ COLOR PALETTE
      colorPalette.getPalette( $scope.detail.img_path );
  });


}]);

app.controller("MovieDetailController", ["$scope", "jsonPad", "movieApi", "userSearch", "colorPalette", "$location", "$filter", function($scope, jsonPad, movieApi, userSearch, colorPalette, $location, $filter) {
  $scope.title = "Current View : Movie Detail";

  userSearch.setDetail( $location.search().id );

  function releaseType() {
    angular.forEach($scope.releases, function(release) {
      if(release.note === undefined || release.note === null || release.note === "") {
        switch(release.type) {
          case 1:
            release.release_type = "Initial Release";
            break;
          case 2:
            release.release_type = "Limited Theatrical";
            break;
          case 3:
            release.release_type = "Theatrical";
            break;
          case 4:
            release.release_type = "Digital";
            break;
          case 5:
            release.release_type = "Physical";
            break;
          case 6:
            release.release_type = "TV";
            break;
          default:
            break;
        }
      }
      else {
        release.release_type = release.note;
      }
    });
  }


// ---------------------- DETAILS
  jsonPad.getData( movieApi.detailUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data;

  // ____ DETAIL IMAGE
      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/movie-backup.png";
      }
      else {
        $scope.detail.img_path = "http://image.tmdb.org/t/p/w500" + $scope.detail.poster_path;
      }

  // _ DETAIL BACKDROP
      if($scope.detail.backdrop_path === null) {
        if($scope.detail.poster_path !== null) {
          $scope.detail.backdrop = $scope.detail.img_path;
        }
        else {
          $scope.detail.backdrop = "../imgs/movie-backup.png";
        }
      }
      else {
        $scope.detail.backdrop = "http://image.tmdb.org/t/p/w500" + $scope.detail.backdrop_path;
      }

      document.getElementById("detail-img-background").style.backgroundImage = "url(" + $scope.detail.backdrop + ")";

  // ___ COLOR PALETTE
      colorPalette.getPalette( $scope.detail.img_path );

  // ______ PRODUCTION
      $scope.production = response.data.production_companies;

      if($scope.production.length === 0) {
        $scope.productionList = [{name:"n/a"}];
      }
      else {
        $scope.productionList = $scope.production;
      }

  // __________ GENRES
      $scope.genres = response.data.genres;

      if($scope.genres.length === 0) {
        $scope.genreList = [{name:"n/a"}];
      }
      else {
        $scope.genreList = $scope.genres;
      }

  // _________ SUMMARY
      $scope.overview = response.data.overview;

      if($scope.overview === null || $scope.overview === undefined || $scope.overview === "") {
        $scope.detail.summary = "n/a";
      }
      else {
        $scope.detail.summary = $scope.overview;
      }

  // --------------------- RELEASES
      jsonPad.getData( movieApi.releaseUrl(), movieApi.callback() ).then(
        function successCallback(response) {
          $scope.releaseUS = $filter("filter")(response.data.results, {iso_3166_1: "US"})[0];

          if($scope.releaseUS === null || $scope.releaseUS === undefined || $scope.releaseUS === "" || $scope.releaseUS.length === 0) {
            // $scope.releases = [{release_date:"n/a"}];

            // console.log($scope.detail.release_date);
            $scope.releases = [{release_date: $scope.detail.release_date, type: 1}];
          }
          else {
            $scope.releases = $filter("orderBy")($scope.releaseUS.release_dates, "release_date");
          }

          releaseType();
      });
  });


}]);

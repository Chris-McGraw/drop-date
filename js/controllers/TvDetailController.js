app.controller("TvDetailController", ["$scope", "jsonPad", "tvApi", "countrySelect", "userSearch", "colorPalette", "$location", function($scope, jsonPad, tvApi, countrySelect, userSearch, colorPalette, $location) {
  userSearch.setDetail( $location.search().id );


// -------------------- FUNCTIONS
  function getReleaseList(response) {
    $scope.selectedCountry = countrySelect.getCountry();

    if(response.data.origin_country.length === 0 || response.data.origin_country.toString() === countrySelect.getCountryAlt()) {
      response.data.release_date = response.data.first_air_date;
    }
    else {
      response.data.release_date = "n/a";
    }

    getReleaseTense(response, response.data.release_date);
  }

  function getReleaseTense(response, release) {
    if(release === "n/a") {
      response.data.release_tense = "";
    }
    else if( new Date( release.replace(/-/g, "/") ) <= new Date() ) {
      response.data.release_tense = "Initial Release";
    }
    else {
      response.data.release_tense = "Expected Release";
    }
  }

// ---------------------- DETAILS
  jsonPad.getData( tvApi.detailUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data;
      $scope.media = "tv";

  // ____ DETAIL IMAGE
      if($scope.detail.poster_path === null) {
        $scope.detail.img_path = "../../imgs/tv-backup.png";
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
          $scope.detail.backdrop = "../imgs/tv-backup.png";
        }
      }
      else {
        $scope.detail.backdrop = "http://image.tmdb.org/t/p/w500" + $scope.detail.backdrop_path;
      }

      document.getElementById("detail-img-background").style.backgroundImage = "url(" + $scope.detail.backdrop + ")";

  // ___ COLOR PALETTE
      colorPalette.getPalette( $scope.detail.img_path, document.getElementById("detail-feature-container") );

  // ________ RELEASES
      getReleaseList(response);

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
  });


}]);

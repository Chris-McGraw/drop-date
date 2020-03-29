app.controller("GameDetailController", ["$scope", "jsonPad", "gameApi", "countrySelect", "mediaView", "userSearch", "colorPalette", "$location", "$filter", function($scope, jsonPad, gameApi, countrySelect, mediaView, userSearch, colorPalette, $location, $filter) {
  mediaView.getCurrentType();

  userSearch.setDetail( $location.search().id );


  var releaseTense = "";


// -------------------- FUNCTIONS
  function getReleaseList() {
    jsonPad.getData( gameApi.releaseUrl(), gameApi.callback() ).then(
      function successCallback(response) {
        var detailReleaseDate = new Date($scope.detail.expected_release_year + "/" + $scope.detail.expected_release_month + "/" + $scope.detail.expected_release_day);

        $scope.selectedCountry = countrySelect.getCountry();
        $scope.countryReleases = $filter("filter")(response.data.results, {region: {name: countrySelect.getCountryFull()}});

      // check detail api for game releases in all countries
      // if results unavailable return expected release date from detail api
      // if expected release date unavailable return unavailable
        if($scope.detail.releases === null || $scope.detail.releases === undefined || $scope.detail.releases === "" || $scope.detail.releases.length === 0) {
          if($scope.detail.expected_release_year === null || $scope.detail.expected_release_year === undefined || $scope.detail.expected_release_year === "") {
            $scope.releases = [{date: "n/a"}];
          }
          else {
            getReleaseTense(detailReleaseDate);

            $scope.releases = [{name:releaseTense, date: detailReleaseDate}];
          }
        }
      // check release api for game releases in currently selected country
      // if results unavailable return unavailable
        else if($scope.countryReleases === null || $scope.countryReleases === undefined || $scope.countryReleases === "" || $scope.countryReleases.length === 0) {
          $scope.releases = [{date: "n/a"}];
        }
      // loop through release api results for game releases in currently selected country
      // check release type and return appropriate results
      // if results unavailable return unavailable
        else {
          angular.forEach($scope.countryReleases, function(release) {
            if(release.release_date === null || release.release_date === undefined || release.release_date === "") {
              if(release.expected_release_year === null|| release.expected_release_year === undefined || release.expected_release_year === "") {
                release.date = "n/a";
              }
              else {
                release.date = new Date(release.expected_release_year + "/" + release.expected_release_month + "/" + release.expected_release_day);
              }
            }
            else {
              release.date = new Date( release.release_date.replace(/-/g, "/") );
            }
          });

          $scope.releases = $filter("orderBy")($scope.countryReleases, "date");
        }

  // ---------------------- REVIEWS
        // var releaseGuidArray = [];
        //
        // angular.forEach($scope.releases, function(release) {
        //   release.date = release.release_date.replace(/ /g,"T");
        //
        //   releaseGuidArray.push(release.guid);
        // });
        //
        // jsonPad.getData( gameApi.reviewUrl( releaseGuidArray.join(",") ), gameApi.callback() ).then(
        //   function successCallback(response) {
        //     console.log(response.data.results);
        // });
    });
  }

  function getReleaseTense(release) {
    if( release <= new Date() ) {
      releaseTense = "Initial Release";
    }
    else {
      releaseTense = "Expected Release";
    }
  }

// ---------------------- DETAILS
  jsonPad.getData( gameApi.detailUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results;
      $scope.media = "games";

      // console.log($scope.detail.releases);

  // ____ DETAIL IMAGE
      if( $scope.detail.image.small_url.includes("gb_default") ) {
        $scope.detail.img_path = "imgs/game-backup.png";
      }
      else {
        $scope.detail.img_path = $scope.detail.image.small_url;
      }

  // _ DETAIL BACKDROP
      document.getElementById("detail-img-background").style.backgroundImage = "url(" + $scope.detail.img_path + ")";

  // ___ COLOR PALETTE
      colorPalette.getPalette( $scope.detail.img_path, document.getElementById("detail-feature-container") );

  // ______ PRODUCTION
      $scope.production = response.data.results.developers;

      if($scope.production === null || $scope.production === undefined || $scope.production === "" || $scope.production.length === 0) {
        $scope.productionList = [{name:"n/a"}];
      }
      else {
        $scope.productionList = $scope.production;
      }

  // __________ GENRES
      $scope.genres = response.data.results.genres;

      if($scope.genres === null || $scope.genres === undefined || $scope.genres === "" || $scope.genres.length === 0) {
        $scope.genreList = [{name:"n/a"}];
      }
      else {
        $scope.genreList = $scope.genres;
      }

  // _________ SUMMARY
      $scope.overview = response.data.results.deck;

      if($scope.overview === null || $scope.overview === undefined || $scope.overview === "") {
        $scope.detail.summary = "n/a";
      }
      else {
        $scope.detail.summary = response.data.results.deck;
      }

  // --------------------- RELEASES
      getReleaseList();
  });


}]);

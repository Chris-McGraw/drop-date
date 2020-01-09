app.controller("GameDetailController", ["$scope", "jsonPad", "gameApi", "userSearch", "colorPalette", "$location", "$filter", function($scope, jsonPad, gameApi, userSearch, colorPalette, $location, $filter) {
  $scope.title = "Current View : Detail";

  userSearch.setDetail( $location.search().id );

// ---------------------- DETAILS
  jsonPad.getData( gameApi.detailUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.detail = response.data.results;
      $scope.production = response.data.results.developers;
      $scope.genres = response.data.results.genres;

      // console.log($scope.detail);

      // if($scope.detail.releases === undefined) {
      //   $scope.detail.release_date =  $scope.detail.expected_release_year
      //                  + "-" + $scope.detail.expected_release_month
      //                  + "-" + $scope.detail.expected_release_day;
      //   console.log($scope.detail.release_date);
      // }

      if($scope.detail.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
        $scope.detail.img_path = "../../imgs/game-backup.png";
      }
      else {
        $scope.detail.img_path = $scope.detail.image.small_url;
      }



// _ BACKDROP BACKUP
      document.getElementById("detail-img-background").style.backgroundImage = "url(" + $scope.detail.img_path + ")";

// ___ COLOR PALETTE
      colorPalette.getPalette( $scope.detail.img_path );


// ------------------- CHARACTERS
      var charIdArray = [];

      for(i = 0; i < 10; i++) {
        if(i === response.data.results.characters.length) {
          break;
        }
        else {
          charIdArray.push(response.data.results.characters[i].id + "|");
        }
      }

      jsonPad.getData( gameApi.characterUrl( charIdArray.join("") ), gameApi.callback() ).then(
        function successCallback(response) {
          $scope.charList = response.data.results;

          angular.forEach($scope.charList, function(char) {
            if(char.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
              char.img_path = "../../imgs/cast-backup.png";
            }
            else {
              char.img_path = char.image.small_url;
            }
          });
      });
  });


// --------------------- RELEASES
  jsonPad.getData( gameApi.releaseUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.releaseUS = $filter("filter")(response.data.results, {region: {name: "United States"}});
      $scope.releases = $filter("orderBy")($scope.releaseUS, "release_date");

      angular.forEach($scope.releases, function(release) {
        release.date = release.release_date.replace(/ /g,"T");
      });


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


}]);

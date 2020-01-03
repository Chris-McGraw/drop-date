app.controller("GameDetailController", ["$scope", "jsonPad", "gameApi", "userSearch", "$location", "$filter", function($scope, jsonPad, gameApi, userSearch, $location, $filter) {
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
              char.img_path = "../../imgs/game-backup.png";
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
      // console.log(response.data.results);

      $scope.releaseUS = $filter("filter")(response.data.results, {region: {name: "United States"}});
      // console.log($scope.releaseUS);


      $scope.releases = $filter("orderBy")($scope.releaseUS, "release_date");
      // console.log($scope.releases);

      // releaseType();
  });


}]);

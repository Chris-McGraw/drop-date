app.controller("TvController", ["$scope", "userSearch", "$location", "jsonPad", "tvApi", "$filter", function($scope, userSearch, $location, jsonPad, tvApi, $filter) {
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/tv/results/");
  }

// ----------------------- IMAGES
  jsonPad.getData( tvApi.searchBackdropUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      // console.log(response.data.backdrops);
      var searchBackdrop = $filter("filter")(response.data.backdrops, {file_path: "/jUk4H1XYyMzdiNcF0VwNtEGrb1x.jpg"});

      document.getElementById("tv-home-hero-container").style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + searchBackdrop[0].file_path + ")";
  });


}]);

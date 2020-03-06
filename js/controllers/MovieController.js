app.controller("MovieController", ["$scope", "mediaView", "userSearch", "$location", "jsonPad", "movieApi", "$filter", function($scope, mediaView, userSearch, $location, jsonPad, movieApi, $filter) {
  $scope.buttonText = "Search";

  mediaView.getCurrentType();

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/movies/results/");
  }

// ----------------------- IMAGES
  jsonPad.getData( movieApi.searchBackdropUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      // console.log(response.data.backdrops);
      var searchBackdrop = $filter("filter")(response.data.backdrops, {file_path: "/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg"});

      document.getElementById("movie-home-hero-container").style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + searchBackdrop[0].file_path + ")";
  });


}]);

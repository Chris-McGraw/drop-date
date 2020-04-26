app.controller("MovieController", ["$scope", "mediaView", "userSearch", "$location", "jsonPad", "movieApi", "$filter", function($scope, mediaView, userSearch, $location, jsonPad, movieApi, $filter) {
// ________ SERVICE SET UP
  mediaView.getCurrentType();


// _____________ FUNCTIONS
  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/movies/results/");
  }


/* ----------------------------- IMAGES ENDPONT ----------------------------- */
  jsonPad.getData( movieApi.searchBackdropUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      var searchBackdrop = $filter("filter")(response.data.backdrops, {file_path: "/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg"});

      document.getElementById("movie-home-hero-container").style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + searchBackdrop[0].file_path + ")";
  });


}]);

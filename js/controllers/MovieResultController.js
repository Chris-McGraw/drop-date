app.controller("MovieResultController", ["$scope", "userSearch", "jsonPadApi", function($scope, userSearch, jsonPadApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPadApi.getData("https://api.themoviedb.org/3/search/movie?api_key=",
    "239a65ddae71707eccfac11b087ecbb9",
    "&query=" + userSearch.getData() + "&language=en-US&page=1&include_adult=false&region=US",
    "callback"
  ).then(
    function successCallback(response) {
      $scope.results = response.data.results;
  });

}]);

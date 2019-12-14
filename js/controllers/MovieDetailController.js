app.controller("MovieDetailController", ["$scope", "userSearch", "jsonPadApi", "$routeParams", function($scope, userSearch, jsonPadApi, $routeParams) {
  $scope.title = "Current View : Movie Detail";

// ---------------------- DETAILS
  jsonPadApi.getData("https://api.themoviedb.org/3/search/movie?api_key=",
    "239a65ddae71707eccfac11b087ecbb9",
    "&query=" + userSearch.getData() + "&language=en-US&page=1&include_adult=false&region=US",
    "callback"
  ).then(
    function successCallback(response) {
      $scope.detail = response.data.results[$routeParams.id];
  });

}]);

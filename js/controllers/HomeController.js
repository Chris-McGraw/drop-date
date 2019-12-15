app.controller("HomeController", ["$scope", "jsonPad", "gameApi", "movieApi", "tvApi", function($scope, jsonPad, gameApi, movieApi, tvApi) {
  $scope.title = "Current View : Home";
  $scope.gameTitle = "Video Games";
  $scope.movieTitle = "Movies";
  $scope.tvTitle = "Television";

// ------------------------ GAMES
  jsonPad.getData( gameApi.releaseUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      $scope.games = response.data.results;
  });

// ----------------------- MOVIES
  jsonPad.getData( movieApi.releaseUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.movies = response.data.results;
  });

// ------------------- TELEVISION
  jsonPad.getData( tvApi.releaseUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.shows = response.data.results;
  });
}]);

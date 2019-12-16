app.controller("HomeController", ["$scope", "jsonPad", "movieApi", "tvApi", function($scope, jsonPad, movieApi, tvApi) {
  $scope.title = "Current View : Home";
  $scope.movieTitle = "Movies";
  $scope.tvTitle = "Television";

// ----------------------- MOVIES
  jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.movies = response.data.results;
  });

// ------------------- TELEVISION
  jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.shows = response.data.results;
  });
}]);

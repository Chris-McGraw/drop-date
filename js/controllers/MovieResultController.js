app.controller("MovieResultController", ["$scope", "jsonPad", "movieApi", function($scope, jsonPad, movieApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;

      angular.forEach($scope.results, function(movie) {
        if(movie.poster_path === null) {
          movie.img_path = "../../imgs/movie-backup.png";
        }
        else {
          movie.img_path = "http://image.tmdb.org/t/p/w185" + movie.poster_path;
        }
      });
  });
}]);

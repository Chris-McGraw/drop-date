app.controller("TvResultController", ["$scope", "jsonPad", "tvApi", function($scope, jsonPad, tvApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.results = response.data.results;

      angular.forEach($scope.results, function(show) {
        if(show.poster_path === null) {
          show.img_path = "../../imgs/tv-backup.png";
        }
        else {
          show.img_path = "http://image.tmdb.org/t/p/w185" + show.poster_path;
        }
      });
  });
}]);

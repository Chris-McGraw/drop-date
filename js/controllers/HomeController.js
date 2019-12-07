app.controller("HomeController", ["$scope", "gameReleases", "movieReleases", function($scope, gameReleases, movieReleases) {
  $scope.title = "Current View : Home";
  $scope.buttonText = "Games";

  gameReleases.then(
    function successCallback(response) {
    $scope.games = response.data.results;
    //console.log(response.data.results);
  });

  movieReleases.then(
    function successCallback(response) {
    $scope.movies = response.data.results;
    //console.log(response.data.results);
  });

}]);

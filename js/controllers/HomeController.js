app.controller("HomeController", ["$scope", "jsonPad", "tvApi", function($scope, jsonPad, tvApi) {
  $scope.title = "Current View : Home";
  $scope.tvTitle = "Television";

// ------------------- TELEVISION
  jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
    function successCallback(response) {
      $scope.shows = response.data.results;
  });
}]);

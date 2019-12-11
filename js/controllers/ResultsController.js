app.controller("ResultsController", ["$scope", "userSearch", "jsonPadApi", function($scope, userSearch, jsonPadApi) {
  $scope.title = "Current View : Results";

// ---------------------- RESULTS
  jsonPadApi.getData("https://www.giantbomb.com/api/search/?api_key=",
    "4996f14fcd1ff3aee96c621e0318101b3c6d5729",
    "&query=" + userSearch.getData() + "&format=jsonp&resources=game&limit=20&field_list=name,image,original_release_date,expected_release_month,expected_release_month,expected_release_day,expected_release_year,deck",
    "json_callback"
  ).then(
    function successCallback(response) {
      $scope.results = response.data.results;
  });

}]);

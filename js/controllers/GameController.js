app.controller("GameController", ["$scope", "userSearch", "$location", "jsonPad", "gameApi", "$filter", function($scope, userSearch, $location, jsonPad, gameApi, $filter) {
  $scope.buttonText = "Search";

  $scope.getInput = function() {
    var input = $scope.inputVal;
    userSearch.setData(input);

    $location.search("search", userSearch.getData());
    $location.path("/games/results/");
  }

// ----------------------- IMAGES
  jsonPad.getData( gameApi.searchBackdropUrl(), gameApi.callback() ).then(
    function successCallback(response) {
      // console.log(response.data.results);
      var searchBackdrop = $filter("filter")(response.data.results, {original_url: "https:\/\/giantbomb1.cbsistatic.com\/uploads\/original\/8\/82063\/2643969-wiiu_zelda_scrn02_e3.jpg"});

      document.getElementById("game-home-hero-container").style.backgroundImage = "url(" + searchBackdrop[0].original_url + ")";
  });


}]);

app.controller("HomeController", ["$scope", "jsonPadApi", "localDate", function($scope, jsonPadApi, localDate) {
  $scope.title = "Current View : Home";
  $scope.buttonText = "Games";

// ------------------------ GAMES
  jsonPadApi.getData("https://www.giantbomb.com/api/releases/?api_key=",
    "4996f14fcd1ff3aee96c621e0318101b3c6d5729",
    "&format=jsonp&limit=4&offset=0&field_list=name,game,image,release_date&filter=release_date:" + localDate.getPreviousDate() + "%2000:00:00|" + localDate.getCurrentDate() + "%2000:00:00&sort=release_date:desc",
    "json_callback"
  ).then(
    function successCallback(response) {
      $scope.games = response.data.results;
  });

// ----------------------- MOVIES
  jsonPadApi.getData("https://api.themoviedb.org/3/discover/movie?api_key=",
    "239a65ddae71707eccfac11b087ecbb9",
    "&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=" + localDate.getCurrentDate(),
    "callback"
  ).then(
    function successCallback(response) {
      $scope.movies = response.data.results;
  });

// ------------------- TELEVISION
    jsonPadApi.getData("https://api.themoviedb.org/3/discover/tv?api_key=",
      "239a65ddae71707eccfac11b087ecbb9",
      "&language=en-US&sort_by=first_air_date.desc&first_air_date.lte=" + localDate.getCurrentDate() + "&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=en",
      "callback"
    ).then(
      function successCallback(response) {
        $scope.shows = response.data.results;
    });

}]);

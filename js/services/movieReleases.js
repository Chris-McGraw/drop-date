app.factory('movieReleases', ['$http', "$sce", function($http, $sce) {
  var baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
  var key = "239a65ddae71707eccfac11b087ecbb9";
  var url = baseURL + key + "&language=en-US&region=US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2019-12-07";
  var trustedUrl = $sce.trustAsResourceUrl(url);

  //console.log(url);

  return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
    .then(
      function successCallback(response) {
      console.log(response);
      return response;
    },
    function errorCallback(response) {
      console.log("error");
    });
}]);

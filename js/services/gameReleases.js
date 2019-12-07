app.factory('gameReleases', ['$http', "$sce", function($http, $sce) {
  var baseURL = "https://www.giantbomb.com/api/releases/?api_key=";
  var key = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";
  var url = baseURL + key + "&format=jsonp&limit=4&offset=0&field_list=name,game,image,release_date&filter=release_date:2019-12-01%2000:00:00|2019-12-07%2000:00:00&sort=release_date:desc";
  var trustedUrl = $sce.trustAsResourceUrl(url);

  //console.log(url);

  return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'json_callback'})
    .then(
      function successCallback(response) {
      console.log(response);
      return response;
    },
    function errorCallback(response) {
      console.log("error");
    });
}]);

var baseURL = "https://www.giantbomb.com/api/search/?api_key=";
var gbKey = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";

app.factory('photos', ['$http', "$sce", function($http, $sce) {
  var url = baseURL + gbKey + "&format=jsonp&query=zelda&resources=game&limit=8&field_list=name,image,original_release_date,expected_release_month,expected_release_month,expected_release_day,expected_release_year,deck";
  var trustedUrl = $sce.trustAsResourceUrl(url);

  return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'json_callback'})
    .then(
      function successCallback(response) {
      //console.log(response);
      console.log(response.data.results);
      return response;
    },
    function errorCallback(response) {
      console.log("error");
    });
}]);

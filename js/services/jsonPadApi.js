app.factory("jsonPadApi", ["$http", "$sce", "$cacheFactory", function($http, $sce, $cacheFactory) {
  return {
    getData : function(baseUrl, key, endUrl, callback) {
      $http.defaults.cache = true;
      var httpCache = $cacheFactory.get('$http');

      var fullUrl = baseUrl + key + endUrl;
      var trustedUrl = $sce.trustAsResourceUrl(fullUrl);

      return $http.jsonp( trustedUrl, {jsonpCallbackParam: callback} )
        .then(
          function successCallback(response) {
          //console.log(response);
          return response;
        },
        function errorCallback(response) {
          console.log("error");
        });
    }
  }
}]);

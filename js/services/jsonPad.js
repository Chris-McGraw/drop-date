app.factory("jsonPad", ["$http", "$sce", "$cacheFactory", function($http, $sce, $cacheFactory) {
  return {
    getData : function(url, callback) {
      $http.defaults.cache = true;
      var httpCache = $cacheFactory.get('$http');

      var trustedUrl = $sce.trustAsResourceUrl(url);

      return $http.jsonp( trustedUrl, {jsonpCallbackParam: callback} ).then(
        function successCallback(response) {
          return response;
        },
        function errorCallback(response) {
          console.log("error");
        });
    }
  }
}]);

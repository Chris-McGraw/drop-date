app.factory("jsonPadApi", ["$http", "$sce", function($http, $sce) {
  return {
    getData : function(baseUrl, key, endUrl, callback) {
      var fullUrl = baseUrl + key + endUrl;
      var trustedUrl = $sce.trustAsResourceUrl(fullUrl);

      return $http.jsonp( trustedUrl, {jsonpCallbackParam: callback} )
        .then(
          function successCallback(response) {
          console.log(response);
          return response;
        },
        function errorCallback(response) {
          console.log("error");
        });
    }
  }
}]);

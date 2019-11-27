/* app.factory('photos', ['$http', function($http) {
  return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json')
    .success(function(data) {
      return data;
    })
    .error(function(data) {
      return data;
    });
}]); */


app.factory("photos", ["$http", function($http) {
  $http.get("https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json").then(successCallback, errorCallback);

  return {
    successCallback: function() {
                return response.data;
            }
  };

}]);

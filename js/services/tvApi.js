app.service("tvApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "239a65ddae71707eccfac11b087ecbb9";

  this.releaseUrl = function() {
    return "https://api.themoviedb.org/3/discover/tv?api_key=" + key
    + "&language=en-US&sort_by=first_air_date.desc&first_air_date.lte="
    + localDate.getCurrentDate()
    + "&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=en";
  }

  // this.searchUrl = function() {
  //   return "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query="
  //   + userSearch.getData() + "&language=en-US&page=1&include_adult=false&region=US";
  // }

  this.callback = function() {
    return "callback";
  }
}]);

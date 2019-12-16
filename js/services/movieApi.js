app.service("movieApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "239a65ddae71707eccfac11b087ecbb9";

  this.recentUrl = function() {
    return "https://api.themoviedb.org/3/discover/movie?api_key=" + key
    + "&language=en-US&region=US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte="
    + localDate.getCurrentDate();
  }

  this.searchUrl = function() {
    return "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query="
    + userSearch.getData() + "&language=en-US&page=1&include_adult=false&region=US";
  }

  this.callback = function() {
    return "callback";
  }
}]);

app.service("tvApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "239a65ddae71707eccfac11b087ecbb9";

  this.recentUrl = function() {
    return "https://api.themoviedb.org/3/discover/tv?api_key=" + key
    + "&language=en-US&timezone=America%2FNew_York&sort_by=first_air_date.desc"
    + "&include_null_first_air_dates=false&with_original_language=en&page=1"
    + "&first_air_date.lte=" + localDate.getCurrentDate();
  }

  this.upcomingUrl = function() {
    return "https://api.themoviedb.org/3/discover/tv?api_key=" + key
    + "&language=en-US&timezone=America%2FNew_York&sort_by=first_air_date.asc"
    + "&include_null_first_air_dates=false&with_original_language=en&page=1"
    + "&first_air_date.gte=" + localDate.getTomorrowDate();
  }

  this.searchUrl = function() {
    return "https://api.themoviedb.org/3/search/tv?api_key=" + key
    + "&language=en-US&page=1"
    + "&query=" + userSearch.getData();
  }

  this.callback = function() {
    return "callback";
  }
}]);

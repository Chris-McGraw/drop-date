app.service("tvApi", ["countrySelect", "localDate", "userSearch", function(countrySelect, localDate, userSearch) {
  var key = "239a65ddae71707eccfac11b087ecbb9";

  this.recentUrl = function() {
    return "https://api.themoviedb.org/3/discover/tv?api_key=" + key
    + "&language=en-US&timezone=America%2FNew_York&sort_by=first_air_date.desc"
    + "&include_null_first_air_dates=false"
    + "&with_original_language=" + countrySelect.getLang()
    + "&page=1"
    + "&first_air_date.lte=" + localDate.getCurrentDate();
  }

  this.upcomingUrl = function() {
    return "https://api.themoviedb.org/3/discover/tv?api_key=" + key
    + "&language=en-US&timezone=America%2FNew_York&sort_by=first_air_date.asc"
    + "&include_null_first_air_dates=false"
    + "&with_original_language=" + countrySelect.getLang()
    + "&page=1"
    + "&first_air_date.gte=" + localDate.getTomorrowDate();
  }

  this.searchUrl = function() {
    return "https://api.themoviedb.org/3/search/tv?api_key=" + key
    + "&query=" + userSearch.getQuery()
    + "&language=en-US"
    + "&page=" + userSearch.getSearchPage();
  }

  this.detailUrl = function() {
    return "https://api.themoviedb.org/3/tv/" + userSearch.getDetail()
    + "?api_key=" + key
    + "&language=en-US";
  }

  this.castUrl = function() {
    return "https://api.themoviedb.org/3/tv/" + userSearch.getDetail()
    + "/credits"
    + "?api_key=" + key;
  }

  this.callback = function() {
    return "callback";
  }
}]);

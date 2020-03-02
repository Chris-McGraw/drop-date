app.service("movieApi", ["countrySelect", "localDate", "userSearch", function(countrySelect, localDate, userSearch) {
  var key = "239a65ddae71707eccfac11b087ecbb9";

  this.recentUrl = function() {
    return "https://api.themoviedb.org/3/movie/now_playing"
    + "?api_key=" + key
    + "&language=en-US&region=" + countrySelect.getCountryAlt()
    + "&sort_by=release_date.desc&include_adult=false&include_video=false&page=1";
  }

  this.upcomingUrl = function() {
    return "https://api.themoviedb.org/3/movie/upcoming"
    + "?api_key=" + key
    + "&language=en-US&region=" + countrySelect.getCountryAlt()
    + "&sort_by=release_date.asc&include_adult=false&include_video=false&page=1";
  }

  this.searchBackdropUrl = function() {
    return "https://api.themoviedb.org/3/movie/862/images"
    + "?api_key=" + key
    + "&language=en-US&include_image_language=null";
  }

  this.searchUrl = function() {
    return "https://api.themoviedb.org/3/search/movie"
    + "?api_key=" + key
    + "&query=" + userSearch.getQuery()
    + "&language=en-US&region=" + countrySelect.getCountryAlt()
    + "&page=" + userSearch.getSearchPage()
    + "&include_adult=false";
  }

  this.detailUrl = function() {
    return "https://api.themoviedb.org/3/movie/" + userSearch.getDetail()
    + "?api_key=" + key
    + "&language=en-US";
  }

  this.releaseUrl = function() {
    return "https://api.themoviedb.org/3/movie/" + userSearch.getDetail()
    + "/release_dates"
    + "?api_key=" + key;
  }

  this.castUrl = function() {
    return "https://api.themoviedb.org/3/movie/" + userSearch.getDetail()
    + "/credits"
    + "?api_key=" + key;
  }

  this.callback = function() {
    return "callback";
  }
}]);

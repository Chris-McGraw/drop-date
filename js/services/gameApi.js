app.service("gameApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";

  this.recentUrl = function() {
    return "https://www.giantbomb.com/api/games/?api_key=" + key
    + "&format=jsonp&limit=100&offset=0"
    + "&field_list=id,name,image,original_release_date,expected_release_day,expected_release_month,expected_release_year"
    + "&filter=original_release_date:" + localDate.getPreviousDate() + "%2000:00:00|"
    + localDate.getCurrentDate() + "%2000:00:00&sort=original_release_date:desc";
  }

  this.upcomingUrl = function() {
    return "https://www.giantbomb.com/api/games/?api_key=" + key
    + "&format=jsonp&limit=100&offset=0"
    + "&field_list=id,name,image,original_release_date,expected_release_day,expected_release_month,expected_release_year"
    + "&filter=original_release_date:" + localDate.getTomorrowDate() + "%2000:00:00|"
    + localDate.getFutureDate() + "%2000:00:00&sort=original_release_date:asc";
  }

  this.searchUrl = function() {
    return "https://www.giantbomb.com/api/search/?api_key=" + key
    + "&query=" + userSearch.getQuery() + "&resources=game"
    + "&format=jsonp&limit=20&offset=0"
    + "&field_list=id,name,image,original_release_date,expected_release_month,expected_release_day,expected_release_year";
  }

  this.detailUrl = function() {
    return "https://www.giantbomb.com/api/game/" + userSearch.getDetail()
    + "/?api_key=" + key
    + "&format=jsonp"
    + "&field_list=id,name,image,deck,developers,genres,platforms,number_of_user_reviews,releases,original_game_rating,original_release_date,expected_release_month,expected_release_day,expected_release_year";
  }

  this.releaseUrl = function() {
    return "https://www.giantbomb.com/api/releases/"
    + "?api_key=" + key
    + "&filter=game:" + userSearch.getDetail()
    + "&format=jsonp"
    + "&field_list=name,region,platform,release_date,expected_release_month,expected_release_day,expected_release_year";
  }

  this.callback = function() {
    return "json_callback";
  }
}]);

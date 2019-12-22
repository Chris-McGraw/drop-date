app.service("gameApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";

  this.recentUrl = function() {
    return "https://www.giantbomb.com/api/games/?api_key=" + key
    + "&format=jsonp&limit=100&offset=0&field_list=name,game,image,expected_release_day,expected_release_month,expected_release_year,original_release_date"
    + "&filter=original_release_date:" + localDate.getPreviousDate() + "%2000:00:00|"
    + localDate.getCurrentDate() + "%2000:00:00&sort=original_release_date:desc";
  }

  this.upcomingUrl = function() {
    return "https://www.giantbomb.com/api/games/?api_key=" + key
    + "&format=jsonp&limit=100&offset=0&field_list=name,game,image,expected_release_day,expected_release_month,expected_release_year,original_release_date"
    + "&filter=original_release_date:" + localDate.getTomorrowDate() + "%2000:00:00|"
    + localDate.getFutureDate() + "%2000:00:00&sort=original_release_date:asc"
  }

  this.searchUrl = function() {
    return "https://www.giantbomb.com/api/search/?api_key=" + key
    + "&query=" + userSearch.getData()
    + "&format=jsonp&resources=game&limit=20&field_list=name,image,original_release_date,expected_release_month,expected_release_month,expected_release_day,expected_release_year,deck";
  }

  this.callback = function() {
    return "json_callback";
  }
}]);

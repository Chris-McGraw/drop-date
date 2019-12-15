app.service("gameApi", ["localDate", "userSearch", function(localDate, userSearch) {
  var key = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";

  this.releaseUrl = function() {
    return "https://www.giantbomb.com/api/releases/?api_key=" + key
    + "&format=jsonp&limit=20&offset=0&field_list=name,game,image,release_date&filter=release_date:"
    + localDate.getPreviousDate() + "%2000:00:00|" + localDate.getCurrentDate()
    + "%2000:00:00&sort=release_date:desc";
  }

  this.searchUrl = function() {
    return "https://www.giantbomb.com/api/search/?api_key=" + key + "&query=" + userSearch.getData()
    + "&format=jsonp&resources=game&limit=20&field_list=name,image,original_release_date,expected_release_month,expected_release_month,expected_release_day,expected_release_year,deck";
  }

  this.callback = function() {
    return "json_callback";
  }
}]);

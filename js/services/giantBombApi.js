app.service("giantBombApi", ["localDate", function(localDate) {
  this.baseUrl = function() {
    return "https://www.giantbomb.com/api/releases/?api_key=";
  }

  this.key = function() {
    return "4996f14fcd1ff3aee96c621e0318101b3c6d5729";
  }

  this.endUrl = function() {
    return "&format=jsonp&limit=20&offset=0&field_list=name,game,image,release_date&filter=release_date:" + localDate.getPreviousDate() + "%2000:00:00|" + localDate.getCurrentDate() + "%2000:00:00&sort=release_date:desc";
  }

  this.callback = function() {
    return "json_callback";
  }

}]);

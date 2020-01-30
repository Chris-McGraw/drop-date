app.service("gameApi", ["countrySelect", "localDate", "userSearch", function(countrySelect, localDate, userSearch) {
  var key = "4996f14fcd1ff3aee96c621e0318101b3c6d5729";

  this.recentUrl = function() {
    return "https://www.giantbomb.com/api/releases/"
    + "?api_key=" + key
    + "&format=jsonp&limit=100&offset=0"
    + "&filter=release_date:" + localDate.getPreviousDate() + "%2000:00:00|"
    + localDate.getCurrentDate() + "%2000:00:00,"
    + "region:" + countrySelect.getRegionCode()
    + "&sort=release_date:desc"
    + "&field_list=guid,id,game,name,image,region,release_date,expected_release_day,expected_release_month,expected_release_year";
  }

  this.upcomingUrl = function() {
    return "https://www.giantbomb.com/api/releases/"
    + "?api_key=" + key
    + "&format=jsonp&limit=100&offset=0"
    + "&filter=release_date:" + localDate.getCurrentDate() + "%2000:00:00|"
    + localDate.getFutureDate() + "%2000:00:00,"
    + "region:" + countrySelect.getRegionCode()
    + "&sort=release_date:asc"
    + "&field_list=guid,id,game,name,image,region,release_date,expected_release_day,expected_release_month,expected_release_year";
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
    + "&field_list=id,image,name,releases,developers,genres,deck,characters,platforms,number_of_user_reviews,original_game_rating,original_release_date,expected_release_month,expected_release_day,expected_release_year";
  }

  this.releaseUrl = function() {
    return "https://www.giantbomb.com/api/releases/"
    + "?api_key=" + key
    + "&filter=game:" + userSearch.getDetail()
    + "&format=jsonp"
    + "&field_list=guid,name,region,platform,release_date,expected_release_month,expected_release_day,expected_release_year";
  }

  this.reviewUrl = function(releaseList) {
    return "https://www.giantbomb.com/api/user_reviews/"
    + "?api_key=" + key
    + "&filter=object:" + releaseList
    + "&format=jsonp"
    + "&field_list=wikiObject,reviewer,score";
  }

  this.characterUrl = function(charList) {
    return "https://www.giantbomb.com/api/characters/"
    + "?api_key=" + key
    + "&filter=id:" + charList
    + "&format=jsonp"
    + "&field_list=image,name,real_name";
  }

  this.callback = function() {
    return "json_callback";
  }
}]);

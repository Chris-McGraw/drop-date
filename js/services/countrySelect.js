app.service("countrySelect", ["$location", function($location) {
  var userCountry = "";
  var userCountryAlt = "";
  var userCountryFull = "";
  var countryLang = "";
  var regionCode = "";


  this.getCountry = function() {
    userCountry = document.getElementById("country-select").value.toUpperCase();

    return userCountry;
  }

  this.getCountryAlt = function() {
    if(userCountry = document.getElementById("country-select").value.toUpperCase() === "UK") {
      userCountryAlt = "GB";
    }
    else {
      userCountryAlt = document.getElementById("country-select").value.toUpperCase();
    }

    return userCountryAlt;
  }

  this.getCountryFull = function() {
    var userCountry = document.getElementById("country-select").value.toUpperCase();

    if(userCountry === "US") {
      userCountryFull = "United States";
    }
    else if(userCountry === "UK") {
      userCountryFull = "United Kingdom";
    }
    else if(userCountry === "JP") {
      userCountryFull = "Japan";
    }
    else if(userCountry === "AU") {
      userCountryFull = "Australia";
    }

    return userCountryFull;
  }

  this.getLang = function() {
    var userCountry = document.getElementById("country-select").value.toUpperCase();

    if(userCountry === "US" || userCountry === "UK" || userCountry === "AU") {
      countryLang = "en";
    }
    else if(userCountry === "JP") {
      countryLang = "ja";
    }

    return countryLang;
  }

  this.getRegionCode = function() {
    var userCountry = document.getElementById("country-select").value.toUpperCase();

    if(userCountry === "US") {
      regionCode = 1;
    }
    else if(userCountry === "UK") {
      regionCode = 2;
    }
    else if(userCountry === "JP") {
      regionCode = 6;
    }
    else if(userCountry === "AU") {
      regionCode = 11;
    }

    return regionCode;
  }


}]);

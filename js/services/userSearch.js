app.service("userSearch", function() {
  var userInput = "";

  this.setData = function(input) {
    userInput = input;
  }

  this.getData = function() {
    return userInput;
  }

// ---

  var userQuery = "";

  this.setQuery = function(input) {
    userQuery = input;
  }

  this.getQuery = function() {
    return userQuery;
  }

// ---

  var searchPage = 1;

  this.setSearchPage = function(input) {
    searchPage = input;
  }

  this.getSearchPage = function() {
    return searchPage;
  }

// ---

var pageResults = [];

this.setPageResults = function(input) {
  pageResults = input;
}

this.getPageResults = function() {
  return pageResults;
}

// ---

  var userDetail = "";

  this.setDetail = function(input) {
    userDetail = input;
  }

  this.getDetail = function() {
    return userDetail;
  }
});

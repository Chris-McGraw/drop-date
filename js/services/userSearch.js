app.service("userSearch", function() {
  var userInput = "";
  var userQuery = "";
  var userDetail = "";

  this.setData = function(input) {
    userInput = input;
  }

  this.getData = function() {
    return userInput;
  }

  this.setQuery = function(input) {
    userQuery = input;
  }

  this.getQuery = function() {
    return userQuery;
  }

  this.setDetail = function(input) {
    userDetail = input;
  }

  this.getDetail = function() {
    return userDetail;
  }
});

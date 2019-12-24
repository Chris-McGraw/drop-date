app.service("userSearch", function() {
  var userInput = "";
  var userQuery = "";

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
});

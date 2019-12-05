app.service("userSearch", function() {
  var userInput = "";

  this.setData = function(input) {
    userInput = input;
  }

  this.getData = function() {
    return userInput;
  }
});

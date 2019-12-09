app.service("localDate", function() {
// ------------- GET CURRENT DATE
  var current = new Date();
  var currentISO = current.toISOString();
  var currentDate = currentISO.substr( 0, currentISO.indexOf("T") );

  this.getCurrentDate = function() {
    return currentDate;
  }

// ------------ GET PREVIOUS DATE
  var previous = new Date();
  previous.setDate(previous.getDate() - 14);
  var previousISO = previous.toISOString();
  var previousDate = previousISO.substr( 0, previousISO.indexOf("T") );

  this.getPreviousDate = function() {
    return previousDate;
  }
});

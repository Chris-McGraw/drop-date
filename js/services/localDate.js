app.service("localDate", function() {
// ------------- GET CURRENT DATE
  var current = new Date();
  var currDay = String(current.getDate()).padStart(2, "0");
  var currMonth = String(current.getMonth() + 1).padStart(2, "0");
  var currYear = current.getFullYear();

  var currentDate = currYear + "-" + currMonth + "-" + currDay;

  this.getCurrentDate = function() {
    return currentDate;
  }

// ------------ GET PREVIOUS DATE
  var previous = new Date();
  previous.setDate(previous.getDate() - 14);
  var prevDay = String(previous.getDate()).padStart(2, "0");
  var prevMonth = String(previous.getMonth() + 1).padStart(2, "0");
  var prevYear = previous.getFullYear();

  var previousDate = prevYear + "-" + prevMonth + "-" + prevDay;

  this.getPreviousDate = function() {
    return previousDate;
  }
});

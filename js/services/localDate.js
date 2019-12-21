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

// ------------ GET TOMORROW DATE
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var tmwDay = String(tomorrow.getDate()).padStart(2, "0");
  var tmwMonth = String(tomorrow.getMonth() + 1).padStart(2, "0");
  var tmwYear = tomorrow.getFullYear();

  var tomorrowDate = tmwYear + "-" + tmwMonth + "-" + tmwDay;

  this.getTomorrowDate = function() {
    return tomorrowDate;
  }

// ------------ GET PREVIOUS DATE
  var previous = new Date();
  previous.setDate(previous.getDate() - 90);
  var prevDay = String(previous.getDate()).padStart(2, "0");
  var prevMonth = String(previous.getMonth() + 1).padStart(2, "0");
  var prevYear = previous.getFullYear();

  var previousDate = prevYear + "-" + prevMonth + "-" + prevDay;

  this.getPreviousDate = function() {
    return previousDate;
  }

// -------------- GET FUTURE DATE
  var future = new Date();
  future.setDate(future.getDate() + 90);
  var ftrDay = String(future.getDate()).padStart(2, "0");
  var ftrMonth = String(future.getMonth() + 1).padStart(2, "0");
  var ftrYear = future.getFullYear();

  var futureDate = ftrYear + "-" + ftrMonth + "-" + ftrDay;

  this.getFutureDate = function() {
    return futureDate;
  }
});

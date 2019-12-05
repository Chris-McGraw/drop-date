var userInput = "";

app.directive('getUserInput', ["userInput", function(userInput) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/getUserInput.html',
    link: function(scope, element, attrs) {
      scope.buttonText = "Search";

      scope.getInput = function() {
        console.log("do something");
      }
    }
  };
}]);

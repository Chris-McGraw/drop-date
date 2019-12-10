app.directive('userSearchForm', ["userSearch", "$location", function(userSearch, $location) {
  return {
    restrict: 'E',
    scope: {
      title: '='
    },
    templateUrl: 'js/directives/userSearchForm.html',
    link: function(scope, element, attrs) {
      scope.getInput = function() {
        var input = scope.inputVal;
        userSearch.setData(input);

        $location.path("/" + scope.page + "/results/");
      }
    }
  };
}]);

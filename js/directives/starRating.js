app.directive("starRating", ["jsonPad", "movieApi", "tvApi", function(jsonPad, movieApi, tvApi) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/starRating.html",
    link: function(scope, element, attrs) {

// -----

      function getStarRating(response) {
        scope.starRating = response.data.vote_average / 2;
        // var starRating = response.data.vote_average / 2;

        scope.ratingCount = response.data.vote_count;

        if(scope.starRating < 0.5) {
          scope.oneStar = "far fa-star";
        }
        else if(scope.starRating >= 1) {
          scope.oneStar = "fas fa-star";
        }
        else if(scope.starRating >= 0.5) {
          scope.oneStar = "fas fa-star-half-alt";
        }

        if(scope.starRating < 1.5) {
          scope.twoStar = "far fa-star";
        }
        else if(scope.starRating >= 2) {
          scope.twoStar = "fas fa-star";
        }
        else if(scope.starRating >= 1.5) {
          scope.twoStar = "fas fa-star-half-alt";
        }

        if(scope.starRating < 2.5) {
          scope.threeStar = "far fa-star";
        }
        else if(scope.starRating >= 3) {
          scope.threeStar = "fas fa-star";
        }
        else if(scope.starRating >= 2.5) {
          scope.threeStar = "fas fa-star-half-alt";
        }

        if(scope.starRating < 3.5) {
          scope.fourStar = "far fa-star";
        }
        else if(scope.starRating >= 4) {
          scope.fourStar = "fas fa-star";
        }
        else if(scope.starRating >= 3.5) {
          scope.fourStar = "fas fa-star-half-alt";
        }

        if(scope.starRating < 4.5) {
          scope.fiveStar = "far fa-star";
        }
        else if(scope.starRating >= 5) {
          scope.fiveStar = "fas fa-star";
        }
        else if(scope.starRating >= 4.5) {
          scope.fiveStar = "fas fa-star-half-alt";
        }
      }

// -----

      if(scope.type === "movies") {
        jsonPad.getData( movieApi.detailUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            getStarRating(response);
        });
      }

      else if(scope.type === "tv") {
        jsonPad.getData( tvApi.detailUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            getStarRating(response);
        });
      }

// -----

    }
  };
}]);

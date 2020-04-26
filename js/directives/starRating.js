app.directive("starRating", ["jsonPad", "gameApi", "movieApi", "tvApi", function(jsonPad, gameApi, movieApi, tvApi) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/starRating.html",
    link: function(scope, element, attrs) {

// -----

      function getStarRating(response) {
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

      if(scope.type === "games") {
        jsonPad.getData( gameApi.reviewUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            var gameRatingSum = 0;
            var gameRatingCount = response.data.results.length;
            var gameStarRating = 0;

            angular.forEach(response.data.results, function(result) {
              gameRatingSum += result.score;
            });

            if(gameRatingSum === 0 ) {
              gameStarRating = 0;
            }
            else {
              gameStarRating = Math.round( (gameRatingSum / gameRatingCount) * 10) / 10;
            }

            scope.starRating = gameStarRating;
            scope.ratingCount = gameRatingCount;

            getStarRating(scope.starRating);
        });
      }

      else if(scope.type === "movies") {
        jsonPad.getData( movieApi.detailUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.starRating = response.data.vote_average / 2;
            scope.ratingCount = response.data.vote_count;

            getStarRating(scope.starRating);
        });
      }

      else if(scope.type === "tv") {
        jsonPad.getData( tvApi.detailUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.starRating = response.data.vote_average / 2;
            scope.ratingCount = response.data.vote_count;

            getStarRating(scope.starRating);
        });
      }

// -----

    }
  };
}]);

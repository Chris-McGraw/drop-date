app.directive("searchGrid", ["jsonPad", "gameApi", "movieApi", "tvApi", "userSearch", "$location", function(jsonPad, gameApi, movieApi, tvApi, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/searchGrid.html",
    link: function(scope, element, attrs) {
      userSearch.setQuery( $location.search().search );

// -----

      if(scope.type === "games") {
        function resultLink() {
          angular.forEach(scope.results, function(result) {
            result.link = "#/games/detail/?id=" + result.id;
          });
        }

        function backupImage() {
          angular.forEach(scope.results, function(result) {
            if(result.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
              result.img_path = "../../imgs/game-backup.png";
            }
            else {
              result.img_path = result.image.small_url;
            }
          });
        }

        function formatOverview() {
          angular.forEach(scope.results, function(result) {
            result.overview = result.deck;
          });
        }

        function formatDate() {
          angular.forEach(scope.results, function(result) {
            result.release_date = new Date(result.expected_release_year + "/" + result.expected_release_month + "/" + result.expected_release_day);
          });
        }





        function getPageButtons(response) {
          var pageCountTotal = 0;
          scope.pageButtons = [];

          scope.totalResults = response.data.number_of_total_results;
          scope.pageResultFirst = 1;

          if(response.data.number_of_total_results > 10) {
            scope.pageResultLast = 10;
          }
          else {
            scope.pageResultLast = response.data.number_of_total_results;
          }

          if(response.data.number_of_total_results % 10 === 0) {
            pageCountTotal = (response.data.number_of_total_results / 10);
          }
          else {
            pageCountTotal = ( Math.floor(response.data.number_of_total_results / 10) + 1 );
          }

          for(i = 0; i < pageCountTotal; i++) {
            scope.pageButtons.push({number: i + 1});
          }
        }


        function getCurrentPageResults(results, number) {
          var currentPageResults = [];

          number = number - 1;

          for(i = (number * 10); i < results.length; i++) {
            if(currentPageResults.length < ( (number + 1) * 10) ) {
              currentPageResults.push(results[i]);
            }
          }

          return currentPageResults;
        }





        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
          function successCallback(response) {

            getPageButtons(response);

            scope.clickTest = function(number, $index) {
            // get current page results from API response
              scope.results = getCurrentPageResults(response.data.results, number);

            // get the number of the first result on the current page
              scope.pageResultFirst = ((number * 10) - 9);

            // get the number of the last result on the current page
              if(response.data.number_of_total_results > (number * 10)) {
                scope.pageResultLast = (number * 10);
              }
              else {
                scope.pageResultLast = response.data.number_of_total_results;
              }

            // remove "selected class" styling from all result page buttons
            // add "selected class" styling to selected result page button
              for(i = 0; i < document.getElementsByClassName("result-page-btn").length; i++) {
                document.getElementsByClassName("result-page-btn")[i].style.backgroundColor = "white";
              }
              document.getElementsByClassName("result-page-btn")[$index].style.backgroundColor = "red";

            // scroll to window top
              window.scrollTo(0, 0);
            }

            scope.results = response.data.results;

            resultLink();
            backupImage();
            formatOverview();
            formatDate();
        });
      }

// -----

      else if(scope.type === "movies") {
        function resultLink() {
          angular.forEach(scope.results, function(result) {
            result.link = "#/movies/detail/?id=" + result.id;
          });
        }

        function backupImage() {
          angular.forEach(scope.results, function(result) {
            if(result.poster_path === null) {
              result.img_path = "../../imgs/movie-backup.png";
            }
            else {
              result.img_path = "http://image.tmdb.org/t/p/w185" + result.poster_path;
            }
          });
        }

        function formatName() {
          angular.forEach(scope.results, function(result) {
            result.name = result.title;
          });
        }

        jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            scope.results = response.data.results;

            resultLink();
            backupImage();
            formatName();
        });
      }

// -----

      else if(scope.type === "tv") {
        function resultLink() {
          angular.forEach(scope.results, function(result) {
            result.link = "#/tv/detail/?id=" + result.id;
          });
        }

        function backupImage() {
          angular.forEach(scope.results, function(result) {
            if(result.poster_path === null) {
              result.img_path = "../../imgs/tv-backup.png";
            }
            else {
              result.img_path = "http://image.tmdb.org/t/p/w185" + result.poster_path;
            }
          });
        }

        function formatDate() {
          angular.forEach(scope.results, function(result) {
            result.release_date = result.first_air_date;
          });
        }

        jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            scope.results = response.data.results;

            resultLink();
            backupImage();
            formatDate();
        });
      }

// -----

      else {
        console.log("error");
      }

    }
  };
}]);

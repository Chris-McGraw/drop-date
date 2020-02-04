app.directive("searchGrid", ["jsonPad", "gameApi", "movieApi", "tvApi", "userSearch", "$location", function(jsonPad, gameApi, movieApi, tvApi, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/searchGrid.html",
    link: function(scope, element, attrs) {
      userSearch.setQuery( $location.search().search );

      scope.searchTest = $location.search().search;

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





        function getPageButtons(response, currentPage) {
          var pageCountTotal = 0;
          scope.pageButtons = [];

        // get the total number of results for the current search
          scope.totalResults = response.data.number_of_total_results;

        // get the total number of result page buttons needed for the current search
          if(response.data.number_of_total_results % 10 === 0) {
            pageCountTotal = (response.data.number_of_total_results / 10);
          }
          else {
            pageCountTotal = ( Math.floor(response.data.number_of_total_results / 10) + 1 );
          }

          for(i = 0; i < pageCountTotal; i++) {
            scope.pageButtons.push({number: i + 1});
          }

        // get the number of the first result on the current page
          scope.pageResultFirst = ((currentPage * 10) - 9);

        // get the number of the last result on the current page
          if(response.data.number_of_total_results > (currentPage * 10)) {
            scope.pageResultLast = (currentPage * 10);
          }
          else {
            scope.pageResultLast = response.data.number_of_total_results;
          }
        }


        function getCurrentPageResults(results, number) {
          var currentPageResults = [];

          if(number % 2 !== 0) {
            for(i = 0; i < 10; i++) {
              if(currentPageResults.length < results.length) {
                currentPageResults.push(results[i]);
              }
            }
          }
          else {
            for(i = 10; i < 20; i++) {
              if(currentPageResults.length < (results.length - 10)) {
                currentPageResults.push(results[i]);
              }
            }
          }

          return currentPageResults;
        }


        function getCurrentPage() {
          var currentPage = 1;

          if($location.url().split("page=")[1] === undefined) {
            currentPage = 1;
          }
          else {
            currentPage = $location.url().split("page=")[1];
          }

          return currentPage;
        }





        if(getCurrentPage() === 1) {
          userSearch.setSearchPage( 1 );
        }
        else if(getCurrentPage() % 2 !== 0) {
          userSearch.setSearchPage( (parseInt( getCurrentPage() ) + 1) / 2 );
        }
        else {
          userSearch.setSearchPage( parseInt( getCurrentPage() ) / 2 );
        }





        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            console.log( "current page : " + getCurrentPage() );

          // get current page results from API response
            scope.results = getCurrentPageResults( response.data.results, getCurrentPage() );

          // get current page results from API response
            getPageButtons( response, getCurrentPage() );

          // add "selected" styling to result page button for current page
            setTimeout(function() {
              for(i = 0; i < document.getElementsByClassName("result-page-btn").length; i++) {
                document.getElementsByClassName("result-page-btn")[getCurrentPage() - 1].style.backgroundColor = "red";
              }
            }, 0);





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

app.directive("searchGrid", ["jsonPad", "gameApi", "movieApi", "tvApi", "mediaView", "userSearch", "$location", function(jsonPad, gameApi, movieApi, tvApi, mediaView, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      media: "@"
    },
    templateUrl: "js/directives/searchGrid.html",
    link: function(scope, element, attrs) {

      mediaView.getCurrentType();

// __________ SEARCH SETUP
      userSearch.setQuery( $location.search().search );

      if(getCurrentPage() === 1) {
        userSearch.setSearchPage( 1 );
      }
      else if(getCurrentPage() % 2 !== 0) {
        userSearch.setSearchPage( (parseInt( getCurrentPage() ) + 1) / 2 );
      }
      else {
        userSearch.setSearchPage( parseInt( getCurrentPage() ) / 2 );
      }


// _____________ VARIABLES
      var emptySearchResult = document.getElementById("empty-search-result");


// _____________ FUNCTIONS
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


      function getPageButtons(response, currentPage) {
        var pageCountTotal = 0;
        scope.pageButtons = [];

      // get the total number of results for the current search
        scope.totalResults = response.data.total_results;

      // get the total number of result page buttons needed for the current search
        if(response.data.total_results % 10 === 0) {
          pageCountTotal = (response.data.total_results / 10);
        }
        else {
          pageCountTotal = ( Math.floor(response.data.total_results / 10) + 1 );
        }

        for(i = 0; i < pageCountTotal; i++) {
          scope.pageButtons.push({number: i + 1, page_path: "#/" + scope.media + "/results/?search=" + $location.search().search});
        }

      // get the number of the first result on the current page
        if(response.data.total_results === 0) {
          scope.pageResultFirst = 0;
        }
        else {
          scope.pageResultFirst = ((currentPage * 10) - 9);
        }

      // get the number of the last result on the current page
        if(response.data.total_results > (currentPage * 10)) {
          scope.pageResultLast = (currentPage * 10);
        }
        else {
          scope.pageResultLast = response.data.total_results;
        }

      // check for empty search results or search result page error
        if(response.data.total_results === 0) {
          scope.searchErrorText = "No results. Would you like to search again?";

          emptySearchResult.style.marginBottom = "-10px";
          emptySearchResult.style.display = "block";
        }
        else if(scope.pageResultFirst > scope.pageResultLast) {
          scope.pageResultFirst = 0;
          scope.pageResultLast = 0;

          scope.searchErrorText = "This page does not exist. Please select another page.";

          emptySearchResult.style.marginBottom = "40px";
          emptySearchResult.style.display = "block";
        }
        else {
          emptySearchResult.style.display = "none";
        }
      }


      function changePage(response) {
      // get current page results from API response
        scope.results = getCurrentPageResults( response.data.results, getCurrentPage() );

      // get result page buttons for current search results
        getPageButtons( response, getCurrentPage() );

      // add "selected" styling to result page button for current page
        setTimeout(function() {
          for(i = 0; i < document.getElementsByClassName("result-page-btn").length; i++) {
            document.getElementsByClassName("result-page-btn")[getCurrentPage() - 1].style.backgroundColor = "red";
          }
        }, 0);
      }


// ____ ATTRIBUTE HANDLERS
      if(scope.media === "games") {
        function formatTotalResultNumber(response) {
          response.data.total_results = response.data.number_of_total_results;
        }

        function resultLink(result) {
          result.link = "#/games/detail/?id=" + result.id;
        }

        function backupImage(result) {
          if( result.image.small_url.includes("gb_default") ) {
            result.img_path = "../../imgs/game-backup.png";
          }
          else {
            result.img_path = result.image.small_url;
          }
        }

        function formatOverview(result) {
          result.overview = result.deck;
        }

        function formatDate(result) {
          result.release_date = new Date(result.expected_release_year + "/" + result.expected_release_month + "/" + result.expected_release_day);
        }


        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            formatTotalResultNumber(response);
            changePage(response);

            angular.forEach(scope.results, function(result) {
              resultLink(result);
              backupImage(result);
              formatOverview(result);
              formatDate(result);
            });
        });
      }

// -----

      else if(scope.media === "movies") {
        function resultLink(result) {
          result.link = "#/movies/detail/?id=" + result.id;
        }

        function backupImage(result) {
          if(result.poster_path === null) {
            result.img_path = "../../imgs/movie-backup.png";
          }
          else {
            result.img_path = "http://image.tmdb.org/t/p/w185" + result.poster_path;
          }
        }

        function formatName(result) {
          result.name = result.title;
        }


        jsonPad.getData( movieApi.searchUrl(), movieApi.callback() ).then(
          function successCallback(response) {
            changePage(response);

            angular.forEach(scope.results, function(result) {
              resultLink(result);
              backupImage(result);
              formatName(result);
            });
        });
      }

// -----

      else if(scope.media === "tv") {
        function resultLink(result) {
          result.link = "#/tv/detail/?id=" + result.id;
        }

        function backupImage(result) {
          if(result.poster_path === null) {
            result.img_path = "../../imgs/tv-backup.png";
          }
          else {
            result.img_path = "http://image.tmdb.org/t/p/w185" + result.poster_path;
          }
        }

        function formatDate(result) {
          result.release_date = result.first_air_date;
        }

        jsonPad.getData( tvApi.searchUrl(), tvApi.callback() ).then(
          function successCallback(response) {
            changePage(response);

            angular.forEach(scope.results, function(result) {
              resultLink(result);
              backupImage(result);
              formatDate(result);
            });
        });
      }

// -----

      else {
        console.log("error");
      }

    }
  };
}]);

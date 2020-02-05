app.directive("resultPageControls", ["jsonPad", "gameApi", "movieApi", "tvApi", "userSearch", "$location", function(jsonPad, gameApi, movieApi, tvApi, userSearch, $location) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/resultPageControls.html",
    link: function(scope, element, attrs) {



// _____________ VARIABLES
      scope.searchTest = $location.search().search;


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








// ____ ATTRIBUTE HANDLERS
      if(scope.type === "games") {
        jsonPad.getData( gameApi.searchUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            console.log( "current page : " + getCurrentPage() );

          // get current page results from API response
            // scope.results = getCurrentPageResults( response.data.results, getCurrentPage() );
            userSearch.setPageResults( getCurrentPageResults( response.data.results, getCurrentPage() ) );
            console.log(userSearch.getPageResults());

          // get current page results from API response
            getPageButtons( response, getCurrentPage() );

          // add "selected" styling to result page button for current page
            setTimeout(function() {
              for(i = 0; i < document.getElementsByClassName("result-page-btn").length; i++) {
                document.getElementsByClassName("result-page-btn")[getCurrentPage() - 1].style.backgroundColor = "red";
              }
            }, 0);
        });
      }


    }
  };
}]);

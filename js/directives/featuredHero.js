app.directive("featuredHero", ["fillMediaRow", "userSearch", "jsonPad", "gameApi", function(fillMediaRow, userSearch, jsonPad, gameApi) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/featuredHero.html",
    link: function(scope, element, attrs) {
    // ___________ GAME RETURN
      fillMediaRow.getRecentGames().then(function(data) {
        // console.log(data);

        userSearch.setDetail( data[3].game.id );

        scope.name = data[3].title;
        scope.type = "Video Game";
        scope.release_date = data[3].release_date;


      // ---------------------- DETAILS
        jsonPad.getData( gameApi.detailUrl(), gameApi.callback() ).then(
          function successCallback(response) {
            scope.detail = response.data.results;

        // ____ DETAIL IMAGE
            if(scope.detail.image.small_url === "https://www.giantbomb.com/api/image/scale_small/3026329-gb_default-16_9.png") {
              scope.detail.img_path = "../../imgs/game-backup.png";
            }
            else {
              scope.detail.img_path = scope.detail.image.small_url;
            }

            element[0].firstChild.style.backgroundImage = `url( ${scope.detail.img_path} )`;
        });
      });


    }
  };
}]);

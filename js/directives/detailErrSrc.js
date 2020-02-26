app.directive("detailErrSrc", function() {
  return {
    link: function(scope, element, attrs) {
      element.bind("error", function() {
      // check feature hero for broken imgPath and replace with backup image
        if(scope.type === "Video Game") {
          if(attrs.src != attrs.detailErrSrc) {
            scope.featuredGameImgErr = true;

            attrs.$set("src", "../../imgs/game-backup.png");
          }
        }

      // check detail feature grid for broken imgPath and replace with backup image
        else if(scope.media === "games") {
          if(attrs.src != attrs.detailErrSrc) {
            attrs.$set("src", "../../imgs/game-backup.png");
          }
        }

      // unbind error event to prevent infinite loop
      // in case of broken backup image path
        element.unbind("error");
      });


    }
  }
});
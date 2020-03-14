app.directive("errSrc", function() {
  return {
    link: function(scope, element, attrs) {
      element.bind("error", function() {
      // check mediaRow & searchGrid for broken imgPath and replace with backup image
        if(scope.$parent.media === "games") {
          if(attrs.src != attrs.errSrc) {
            attrs.$set("src", "../../imgs/game-backup.png");
          }
        }
        else if(scope.$parent.media === "movies") {
          if(attrs.src != attrs.errSrc) {
            attrs.$set("src", "../../imgs/movie-backup.png");
          }
        }
        else if(scope.$parent.media === "tv") {
          if(attrs.src != attrs.errSrc) {
            attrs.$set("src", "../../imgs/tv-backup.png");
          }
        }

      // check castRow for broken imgPath and replace with backup image
        else if(scope.$parent.rowTitle === "Characters") {
          if(attrs.src != attrs.errSrc) {
            attrs.$set("src", "../../imgs/cast-backup.png");
          }
        }

      // unbind error event to prevent infinite loop
      // in case of broken backup image path
        element.unbind("error");
      });


    }
  }
});

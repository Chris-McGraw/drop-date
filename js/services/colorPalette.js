app.service("colorPalette", ["localDate", "userSearch", function(localDate, userSearch) {

  this.getPalette = function(detailImg, backdropElement) {
    var img = document.createElement('img');
    img.setAttribute('crossorigin', 'anonymous');
    img.setAttribute('src', detailImg);

    img.addEventListener('load', function() {
      var vibrant = new Vibrant(img);
      var swatches = vibrant.swatches();
      var paletteColor = "";

      if(swatches.Muted === undefined && swatches.DarkMuted === undefined) {
        paletteColor = "0,0,0, 0.4";
      }
      else if(swatches.Muted === undefined) {
        paletteColor = swatches.DarkMuted.rgb[0]
        + "," + swatches.DarkMuted.rgb[1]
        + "," + swatches.DarkMuted.rgb[2]
        + "," + "0";
      }
      else {
        paletteColor = swatches.Muted.rgb[0]
        + "," + swatches.Muted.rgb[1]
        + "," + swatches.Muted.rgb[2]
        + "," + "0.85";
      }

      // console.log(swatches);
      // console.log(paletteColor);

      backdropElement.style.backgroundColor = "rgba(" + paletteColor + ")";
    });
  }


}]);

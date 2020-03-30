app.service("carouselScrollDelay", function() {
  var allowScroll = true;

  this.allowScroll = function(input) {
    allowScroll = true;
  }

  this.preventScroll = function() {
    allowScroll = false;
  }

  this.scrollStatus = function() {
    return allowScroll;
  }
});

app.service("fillMediaRow", ["jsonPad", "movieApi", "tvApi", "gameApi", "countrySelect", "localDate", "$filter", function(jsonPad, movieApi, tvApi, gameApi, countrySelect, localDate, $filter) {


/* --------------------------------- MOVIES --------------------------------- */

// ___________ MOVIE SETUP
  function movieIdPath(movie) {
    movie.idPath = "#/movies/detail/?id=" + movie.id;
  }

  function backupMovieImages(movie) {
    if(movie.poster_path === null) {
      movie.imgPath = "../../imgs/movie-backup.png";
    }
    else {
      movie.imgPath = "http://image.tmdb.org/t/p/w185" + movie.poster_path;
    }
  }

// __________ MOVIE RETURN
  this.getRecentMovies = function() {
    return jsonPad.getData( movieApi.recentUrl(), movieApi.callback() ).then(
      function successCallback(response) {
        var lessThan = function(prop, val) {
          return function(item) {
            return item[prop] <= val;
          }
        }

        var recentMovies = $filter("filter")(response.data.results, lessThan("release_date", localDate.getCurrentDate() ));
        var mediaList = $filter("orderBy")(recentMovies, "release_date", reverse = true);

        angular.forEach(mediaList, function(movie) {
          movieIdPath(movie);
          backupMovieImages(movie);
        });

        // console.log(mediaList);
        return mediaList;
    });
  }

// ---

  this.getUpcomingMovies = function() {
    return jsonPad.getData( movieApi.upcomingUrl(), movieApi.callback() ).then(
      function successCallback(response) {
        var greaterThan = function(prop, val) {
          return function(item) {
            return item[prop] >= val;
          }
        }

        var upcomingMovies = $filter("filter")(response.data.results, greaterThan("release_date", localDate.getTomorrowDate() ));
        var mediaList = $filter("orderBy")(upcomingMovies, "release_date");

        angular.forEach(mediaList, function(movie) {
          movieIdPath(movie);
          backupMovieImages(movie);
        });

        // console.log(mediaList);
        return mediaList;
    });
  }


/* ----------------------------------- TV ----------------------------------- */

// ______________ TV SETUP
  function checkOrigin(prop, val) {
    return function(item) {
      return item[prop].length === 0 || item[prop].toString() === val;
    }
  }

  function tvIdPath(show) {
    show.idPath = "#/tv/detail/?id=" + show.id;
  }

  function backupTvImages(show) {
    if(show.poster_path === null) {
      show.imgPath = "../../imgs/tv-backup.png";
    }
    else {
      show.imgPath = "http://image.tmdb.org/t/p/w185" + show.poster_path;
    }
  }

  function tvTitle(show) {
    show.title = show.name;
  }

  function tvRelease(show) {
    show.release_date = show.first_air_date;
  }

// _____________ TV RETURN
  this.getRecentTv = function() {
    return jsonPad.getData( tvApi.recentUrl(), tvApi.callback() ).then(
      function successCallback(response) {
        var countryTv = $filter("filter")( response.data.results, checkOrigin("origin_country", countrySelect.getCountryAlt() ) );
        var mediaList = $filter("orderBy")(countryTv, "first_air_date", reverse = true);

        angular.forEach(mediaList, function(show) {
          tvIdPath(show);
          backupTvImages(show);
          tvTitle(show);
          tvRelease(show);
        });

        // console.log(mediaList);
        return mediaList;
    });
  }

// ---

  this.getUpcomingTv = function() {
    return jsonPad.getData( tvApi.upcomingUrl(), tvApi.callback() ).then(
      function successCallback(response) {
        var greaterThan = function(prop, val) {
          return function(item) {
            return item[prop] >= val;
          }
        }

        var countryTv = $filter("filter")( response.data.results, checkOrigin( "origin_country", countrySelect.getCountryAlt() ) );
        var upcomingTv = $filter("filter")(countryTv, greaterThan("first_air_date", localDate.getTomorrowDate() ));
        var mediaList = $filter("orderBy")(upcomingTv, "first_air_date");

        angular.forEach(mediaList, function(show) {
          tvIdPath(show);
          backupTvImages(show);
          tvTitle(show);
          tvRelease(show);
        });

        // console.log(mediaList);
        return mediaList;
    });
  }


/* ------------------------------ VIDEO GAMES ------------------------------ */

// ____________ GAME SETUP
  function getTrimmedArray(results, trimmedArray) {
    for(i = 0; i < results.length; i++) {
      if(i === 0) {
        trimmedArray.push(results[i]);
      }

      else if(trimmedArray.length < 20) {
        var hasDuplicate = false;

        for(v = 0; v < trimmedArray.length; v++) {
          if(results[i].game.id === trimmedArray[v].game.id) {
            hasDuplicate = true;
          }
        }

        if(hasDuplicate === false) {
          trimmedArray.push(results[i]);
        }
      }
    }
    return trimmedArray;
  }

  function gameIdPath(game) {
    game.idPath = "#/games/detail/?id=" + game.game.id;
  }

  function backupGameImages(game) {
    if( game.image.small_url.includes("gb_default") ) {
      game.imgPath = "../../imgs/game-backup.png";
    }
    else {
      game.imgPath = game.image.small_url;
    }
  }

  function gameTitle(game) {
    game.title = game.name;
  }

  function formatDate(game) {
    game.release_date = new Date(game.expected_release_year + "/" + game.expected_release_month + "/" + game.expected_release_day);
  }

// ___________ GAME RETURN
  this.getRecentGames = function() {
    return jsonPad.getData( gameApi.recentUrl(), gameApi.callback() ).then(
      function successCallback(response) {
        var trimmedArray = [];
        getTrimmedArray(response.data.results, trimmedArray);

        var mediaList = $filter("filter")(trimmedArray, {release_date:""});

        angular.forEach(mediaList, function(game) {
          gameIdPath(game);
          backupGameImages(game);
          gameTitle(game);
          game.release_date = game.release_date.replace(/ /g,"T");
        });

        // console.log(mediaList);
        return mediaList;
    });
  }

// ---

  this.getUpcomingGames = function() {
    return jsonPad.getData( gameApi.upcomingUrl(), gameApi.callback() ).then(
      function successCallback(response) {
        var trimmedArray = [];
        getTrimmedArray(response.data.results, trimmedArray);

        var mediaList = $filter("filter")(trimmedArray, {expected_release_year:"",
          expected_release_month:"",
          expected_release_day:""}
        );

        angular.forEach(mediaList, function(game) {
          gameIdPath(game);
          backupGameImages(game);
          gameTitle(game);
          formatDate(game);
        });

        // console.log(mediaList);
        return mediaList;
    });
  }


}]);

app.directive("featuredHero", ["fillMediaRow", "userSearch", "jsonPad", "gameApi", "colorPalette", function(fillMediaRow, userSearch, jsonPad, gameApi, colorPalette) {
  return {
    restrict: "E",
    scope: {
      type: "@"
    },
    templateUrl: "js/directives/featuredHero.html",
    link: function(scope, element, attrs) {
// _____________ VARIABLES
      var currentHeroCarouselPage = 1;
      var featuredGame = [];
      var featuredGameDetail = [];
      var featuredMovie = [];
      var featuredTv = [];


// _____________ FUNCTIONS
      function setRandomFeaturedGame() {
        scope.featuredGameImgErr = false;

        fillMediaRow.getRecentGames().then(function(data) {
          var randomGame = Math.floor(Math.random() * Math.floor(data.length));
          featuredGame = data[randomGame];

          userSearch.setDetail( featuredGame.game.id );

          jsonPad.getData( gameApi.detailUrl(), gameApi.callback() ).then(
            function successCallback(response) {
              featuredGameDetail = response.data.results;

              getCurrentFeaturedGame();
          });
        });
      }


      function getCurrentFeaturedGame() {
        scope.id_path = "#/games/detail/?id=" + featuredGame.game.id;
        scope.type_path = "#/games/";
        scope.name = featuredGame.title;
        scope.type = "Video Game";
        scope.release_date = featuredGame.release_date;
        scope.overview = featuredGameDetail.deck;

      // check featured hero for previous game img error
        if(scope.featuredGameImgErr === false) {
          if( featuredGameDetail.image.small_url.includes("gb_default") ) {
            scope.img_path = "../../imgs/game-backup.png";

            element[0].firstChild.style.backgroundImage = "none";
            document.getElementById("featured-hero-inner").style.backgroundColor = "rgba(0,0,0, 0.4)";
          }
          else {
            scope.img_path = featuredGameDetail.image.small_url;

            element[0].firstChild.style.backgroundImage = `url( ${scope.img_path} )`;
            colorPalette.getPalette( scope.img_path, document.getElementById("featured-hero-inner") );
          }
        }
        else {
          scope.img_path = "../../imgs/game-backup.png";

          element[0].firstChild.style.backgroundImage = "none";
          document.getElementById("featured-hero-inner").style.backgroundColor = "rgba(0,0,0, 0.4)";
        }
      }

// ---

      function setRandomFeaturedMovie() {
        scope.featuredMovieImgErr = false;

        fillMediaRow.getRecentMovies().then(function(data) {
          var featureList = [];

          angular.forEach(data, function(movie) {
            if(movie.imgPath !== "../../imgs/movie-backup.png" && movie.backdrop_path !== null) {
              featureList.push(movie);
            }
          });

          var randomMovie = Math.floor(Math.random() * Math.floor(featureList.length));
          featuredMovie = featureList[randomMovie];
        });
      }


      function getCurrentFeaturedMovie() {
        scope.id_path = "#/movies/detail/?id=" + featuredMovie.id;
        scope.type_path = "#/movies/";
        scope.name = featuredMovie.title;
        scope.type = "Movie";
        scope.release_date = featuredMovie.release_date;
        scope.overview = featuredMovie.overview;

      // check featured hero for previous movie img error
        if(scope.featuredMovieImgErr === false) {
          if(featuredMovie.poster_path === null) {
            scope.img_path = "../../imgs/movie-backup.png";
          }
          else {
            scope.img_path = "http://image.tmdb.org/t/p/w500" + featuredMovie.poster_path;

            colorPalette.getPalette( scope.img_path, document.getElementById("featured-hero-inner") );
          }
        }
        else {
          scope.img_path = "../../imgs/movie-backup.png";
        }

        scope.backdrop_path = "http://image.tmdb.org/t/p/w500" + featuredMovie.backdrop_path;
        element[0].firstChild.style.backgroundImage = `url( ${scope.backdrop_path} )`;
      }

// ---

      function setRandomFeaturedTv() {
        scope.featuredTvImgErr = false;

        fillMediaRow.getRecentTv().then(function(data) {
          var featureList = [];

          angular.forEach(data, function(tv) {
            if(tv.imgPath !== "../../imgs/tv-backup.png" && tv.backdrop_path !== null) {
              featureList.push(tv);
            }
          });

          var randomTv = Math.floor(Math.random() * Math.floor(featureList.length));
          featuredTv = featureList[randomTv];
        });
      }


      function getCurrentFeaturedTv() {
        scope.id_path = "#/tv/detail/?id=" + featuredTv.id;
        scope.type_path = "#/tv/";
        scope.name = featuredTv.name;
        scope.type = "Television";
        scope.release_date = featuredTv.first_air_date;
        scope.overview = featuredTv.overview;

      // check featured hero for previous tv img error
        if(scope.featuredTvImgErr === false) {
          if(featuredTv.poster_path === null) {
            scope.img_path = "../../imgs/tv-backup.png";
          }
          else {
            scope.img_path = "http://image.tmdb.org/t/p/w500" + featuredTv.poster_path;

            colorPalette.getPalette( scope.img_path, document.getElementById("featured-hero-inner") );
          }
        }
        else {
          scope.img_path = "../../imgs/tv-backup.png";
        }

        scope.backdrop_path = "http://image.tmdb.org/t/p/w500" + featuredTv.backdrop_path;
        element[0].firstChild.style.backgroundImage = `url( ${scope.backdrop_path} )`;
      }

// ---

      function clearCarouselPageButtons() {
        angular.forEach(document.getElementsByClassName("carousel-page-button"), function(button) {
          button.children[0].style.display = "none";
        });
      }


// ________ PAGE VIEW LOAD
      setRandomFeaturedGame();
      setRandomFeaturedMovie();
      setRandomFeaturedTv();


// ________ EVENT HANDLERS
      scope.decreaseHeroCarouselPage = function() {
        clearCarouselPageButtons();

        if(currentHeroCarouselPage === 1) {
          currentHeroCarouselPage = 3;
          document.getElementById("hero-carousel-page-3").children[0].style.display = "block";

          getCurrentFeaturedTv();
        }
        else if(currentHeroCarouselPage === 2) {
          currentHeroCarouselPage = 1;
          document.getElementById("hero-carousel-page-1").children[0].style.display = "block";

          getCurrentFeaturedGame();
        }
        else if(currentHeroCarouselPage === 3) {
          currentHeroCarouselPage = 2;
          document.getElementById("hero-carousel-page-2").children[0].style.display = "block";
          getCurrentFeaturedMovie();
        }
      }

// ---

      scope.increaseHeroCarouselPage = function() {
        clearCarouselPageButtons();

        if(currentHeroCarouselPage === 1) {
          currentHeroCarouselPage = 2;
          document.getElementById("hero-carousel-page-2").children[0].style.display = "block";

          getCurrentFeaturedMovie();
        }
        else if(currentHeroCarouselPage === 2) {
          currentHeroCarouselPage = 3;
          document.getElementById("hero-carousel-page-3").children[0].style.display = "block";

          getCurrentFeaturedTv();
        }
        else if(currentHeroCarouselPage === 3) {
          currentHeroCarouselPage = 1;
          document.getElementById("hero-carousel-page-1").children[0].style.display = "block";

          getCurrentFeaturedGame();
        }
      }

// ---

      scope.changeHeroCarouselPage = function($event) {
      // hide carousel-page-selected child for all carousel-page-buttons
        angular.forEach($event.currentTarget.parentElement.children, function(button) {
          button.children[0].style.display = "none";
        });

      // show carousel-page-selected child for selected carousel-page-button
        $event.currentTarget.children[0].style.display = "block";

      // get featured media results for current carousel page
        if($event.currentTarget.id === "hero-carousel-page-1") {
          currentHeroCarouselPage = 1;
          getCurrentFeaturedGame();
        }
        else if($event.currentTarget.id === "hero-carousel-page-2") {
          currentHeroCarouselPage = 2;
          getCurrentFeaturedMovie();
        }
        else if($event.currentTarget.id === "hero-carousel-page-3") {
          currentHeroCarouselPage = 3;
          getCurrentFeaturedTv();
        }
      }


    }
  };
}]);

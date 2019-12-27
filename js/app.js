var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      controller: "HomeController",
      templateUrl: "views/home.html"
    })

    .when("/games/", {
      controller: "GameController",
      templateUrl: "views/game.html"
    })
    .when("/games/results/", {
      controller: "GameResultController",
      templateUrl: "views/gameResult.html"
    })
    .when("/games/detail/", {
      controller: "GameDetailController",
      templateUrl: "views/gameDetail.html"
    })

    .when("/movies/", {
      controller: "MovieController",
      templateUrl: "views/movie.html"
    })
    .when("/movies/results/", {
      controller: "MovieResultController",
      templateUrl: "views/movieResult.html"
    })
    .when("/movies/detail/", {
      controller: "MovieDetailController",
      templateUrl: "views/movieDetail.html"
    })

    .when("/tv/", {
      controller: "TvController",
      templateUrl: "views/tv.html"
    })
    .when("/tv/results/", {
      controller: "TvResultController",
      templateUrl: "views/tvResult.html"
    })
    .when("/tv/detail/:id", {
      controller: "TvDetailController",
      templateUrl: "views/tvDetail.html"
    })

    .otherwise({
      redirectTo: "/"
    });
});

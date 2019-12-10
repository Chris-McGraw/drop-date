var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      controller: "HomeController",
      templateUrl: "views/home.html"
    })
    .when("/games/", {
      controller: "GamesController",
      templateUrl: "views/games.html"
    })
    .when("/games/results/", {
      controller: "ResultsController",
      templateUrl: "views/results.html"
    })
    .when("/games/detail/:id", {
      controller: "DetailController",
      templateUrl: "views/detail.html"
    })
    .when("/movies/", {
      controller: "MoviesController",
      templateUrl: "views/movies.html"
    })
    .otherwise({
      redirectTo: "/"
    });
});

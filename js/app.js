var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/home", {
      controller: "MainController",
      templateUrl: "views/home.html"
    })
    .when("/second", {
      controller: "SecondController",
      templateUrl: "views/second.html"
    })
    .when("/photos/:id", {
      controller: "PhotoController",
      templateUrl: "views/photo.html"
    })
    .otherwise({
      redirectTo: "/home"
    });
});

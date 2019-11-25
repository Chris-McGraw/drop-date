var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/home", {
      controller: "MainController",
      templateUrl: "home.html"
    })
    .when("/second", {
      controller: "SecondController",
      templateUrl: "second.html"
    })
    .otherwise({
      redirectTo: "/home"
    });
});

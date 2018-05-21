var app = angular.module('noisePolution', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'HomeController',
                templateUrl: '/app/partials/home.partial.html'
            })
        .when('/artists',
            {
                controller: 'ArtistsController',
                templateUrl: '/app/partials/artists.partial.html'
            })
        .when('/albuns',
            {
                controller: 'AlbunsController',
                templateUrl: '/app/partials/albuns.partial.html'
            })
        .otherwise({ redirectTo: '/' });
});
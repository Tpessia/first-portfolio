var app = angular.module('noisePolution', ['ngRoute','ngAnimate']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'HomeController',
                templateUrl: '/app/home/home.partial.html'
            })
        .when('/tracks',
            {
                controller: 'TracksController',
                templateUrl: '/app/tracks/tracks.partial.html'
            })
        .when('/artists',
            {
                controller: 'ArtistsController',
                templateUrl: '/app/artists/artists.partial.html'
            })
        .when('/albuns',
            {
                controller: 'AlbunsController',
                templateUrl: '/app/albuns/albuns.partial.html'
            })
        .otherwise({ redirectTo: '/' });
});
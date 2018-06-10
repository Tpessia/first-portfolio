var app = angular.module('noisePolution', ['ngRoute', 'youtube-embed']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',
            {
                title: '',
                controller: 'HomeController',
                templateUrl: 'app/home/home.partial.html'
            })
        .when('/tracks',
            {
                title: 'Tracks',
                controller: 'TracksController',
                templateUrl: 'app/tracks/tracks.partial.html'
            })
        .when('/artists',
            {
                title: 'Artists',
                controller: 'ArtistsController',
                templateUrl: 'app/artists/artists.partial.html'
            })
        .when('/albums',
            {
                title: 'Albums',
                controller: 'AlbumsController',
                templateUrl: 'app/albums/albums.partial.html'
            })
        .otherwise({ redirectTo: '/' });

    // $locationProvider.html5Mode(true);
});

// Dynamic Title

app.run(function ($rootScope, $window) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.titleClass = current.$$route.title == '' ? 'home' : current.$$route.title.toLowerCase().replace(/ /g, "");
    });

    $rootScope.fallbackImg = $window.location.pathname + 'assets/img/logo-simple-256x256.png';

    $rootScope.baseUrl = $window.location.pathname;
});
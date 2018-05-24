var app = angular.module('noisePolution', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'HomeController',
                templateUrl: '/app/home/home.partial.html'
            })
        .when('/tracks',
            {
                title: 'Tracks',
                controller: 'TracksController',
                templateUrl: '/app/tracks/tracks.partial.html'
            })
        .when('/artists',
            {
                title: 'Artists',
                controller: 'ArtistsController',
                templateUrl: '/app/artists/artists.partial.html'
            })
        .when('/albuns',
            {
                title: 'Albuns',
                controller: 'AlbunsController',
                templateUrl: '/app/albuns/albuns.partial.html'
            })
        .otherwise({ redirectTo: '/' });
});

// Dynamic Title

app.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
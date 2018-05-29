app.directive('gridArtists', function () {
    return {
        scope: {
            series: '='
        },
        controller: 'GridArtistsController',
        templateUrl: 'app/directives/gridartists/gridartists.partial.html'
    };
});
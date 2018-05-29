app.directive('gridAlbums', function () {
    return {
        scope: {
            series: '='
        },
        controller: 'GridAlbumsController',
        templateUrl: 'app/directives/gridalbums/gridalbums.partial.html'
    };
});
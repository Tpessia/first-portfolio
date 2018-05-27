app.directive('tracksGrid', function () {
    return {
        scope: {
            gridTracks: '='
        },
        controller: 'TracksGridController',
        templateUrl: 'app/directives/tracksgrid.partial.html'
    };
});
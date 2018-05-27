app.directive('tracksGrid', function () {
    return {
        scope: {
            gridTracks: '=',
            remove: '='
        },
        controller: 'TracksGridController',
        templateUrl: 'app/directives/tracksgrid.partial.html'
    };
});
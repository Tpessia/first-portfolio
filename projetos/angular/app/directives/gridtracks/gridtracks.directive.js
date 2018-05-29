app.directive('gridTracks', function () {
    return {
        scope: {
            series: '='
        },
        controller: 'GridTracksController',
        templateUrl: 'app/directives/gridtracks/gridtracks.partial.html'
    };
});
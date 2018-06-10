app.directive('materializeVideoFab', function () {
    return {
        scope: {
            play: '&',
            add: '&'
        },
        controller: 'MaterializeFabController',
        templateUrl: 'app/directives/fab/fab.partial.html',
        link: function (scope, element, attrs) {
            setTimeout(function() {
                var instances = M.FloatingActionButton.init($$('.video-fab'), {
                    direction: 'bottom',
                    hoverEnabled: false
                });
            }, 100);
        }
    };
});
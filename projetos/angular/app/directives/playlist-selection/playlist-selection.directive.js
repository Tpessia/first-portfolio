app.directive('playlistSelection', function () {
    return {
        scope: {
            onSelect: '&'
        },
        controller: 'PlaylistSelectionController',
        templateUrl: 'app/directives/playlist-selection/playlist-selection.partial.html',
        link: function (scope, element, attr) {
            var instances = M.Modal.init($$('#playlist-selection'), {});
        }
    };
});
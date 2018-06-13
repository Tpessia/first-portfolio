app.directive('playlistSelection', function () {
    return {
        scope: {
            onSelect: '&'
        },
        controller: 'PlaylistSelectionController',
        templateUrl: 'app/directives/playlist-selection/playlist-selection.partial.html',
        link: function (scope, element, attr) {
            if ($$("#playlist-selection.init").length == 0) {
                $$('#playlist-selection')[0].classList.add('init')
                scope.instances = M.Modal.init($$('#playlist-selection.init'), {});
            }
            else {
                document.querySelectorAll("#playlist-selection:not(.init)").forEach(function (e) { // Dirty remove replic.
                    e.parentNode.removeChild(e);
                });
            }
        }
    };
});
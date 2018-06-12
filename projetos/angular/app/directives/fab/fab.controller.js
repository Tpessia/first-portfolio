app.controller("MaterializeFabController", function ($scope) {
    $scope.onPlaylistSelect = function (playlistName) {
        $scope.add({
            'playlistName': playlistName
        });
    };
});
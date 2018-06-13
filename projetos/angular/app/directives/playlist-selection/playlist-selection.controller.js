app.controller("PlaylistSelectionController", function ($scope, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    
    $scope.selectPlaylist = function (playlistName) {
        $scope.onSelect({ 'playlistName': playlistName });
        $scope.instances[0].close();
    };

    $scope.createPlaylist = function (playlistName) {
        if (userService.savedPlaylists.newPlaylist(playlistName)) {
            $scope.onSelect({ 'playlistName': playlistName });
            $scope.instances[0].close();
            M.toast({
                html: 'Video Adicionado!',
                displayLength: '3000'
            });
        }
        else {
            M.toast({
                html: 'Erro ao criar playlist!',
                classes: 'red darken-4',
                displayLength: '3000'
            });
        }
    }
});
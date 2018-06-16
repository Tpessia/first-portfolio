app.controller("PlaylistSelectionController", function ($scope, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    
    $scope.selectPlaylist = function (playlistName) {
        addPlaylist(playlistName);
    };

    $scope.createPlaylist = function (playlistName) {
        if (userService.savedPlaylists.newPlaylist(playlistName)) {
            addPlaylist(playlistName);
            M.toast({
                html: 'Video added',
                displayLength: '3000'
            });
        }
        else {
            M.toast({
                html: 'Error on playlist creation',
                classes: 'red darken-4',
                displayLength: '3000'
            });
        }
    }

    function addPlaylist(playlistName) {
        $scope.onSelect({ 'playlistName': playlistName });
        $scope.instances[0].close();
        $scope.newPlaylist = "";
    };
});
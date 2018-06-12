app.controller("PlaylistSelectionController", function ($scope, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();

    $scope.selectPlaylist = function (playlistName) {
        $scope.onSelect({ 'playlistName': playlistName });
    };

    $scope.createPlaylist = function (playlistName) {
        var playlistName = window.prompt("qual o nome da playlist?");
        if (userService.savedPlaylists.newPlaylist(playlistName)) {
            
        }
        else {
            alert("erro ao criar playlist")
        }
    }
});
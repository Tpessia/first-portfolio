app.controller("UserPlaylistsController", function ($rootScope, $scope, $route, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    $scope.state = { renamingPlaylist: false };
    
    var firstPlaylistName = $scope.playlists[0].name;
    if (firstPlaylistName) {
        $scope.activePlaylist = {
            'name': firstPlaylistName,
            'list': userService.savedPlaylists.getPlaylist(firstPlaylistName).list
        };
    }

    $scope.selectPlaylist = function (name) {
        $scope.activePlaylist = {
            'name': name,
            'list': userService.savedPlaylists.getPlaylist(name).list
        };
    };

    $scope.deletePlaylsit = function (name) {
        userService.savedPlaylists.deletePlaylist(name);
        $route.reload();
    };

    $scope.renamePlaylist = function (name, newName) {
        $scope.state.renamingPlaylist = false;
        userService.savedPlaylists.renamePlaylist(name, newName);
        $route.reload();
    };

    $scope.removeTrack = function (name, index) {
        userService.savedPlaylists.removeTrack(name, index);
    }

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'id', id: '123456' }
        },
        playCustomPlaylist: function (name) {
            console.log(userService.savedPlaylists.getPlaylist(name).list);
            $rootScope.$broadcast('ytPlayCustomPlaylist', userService.savedPlaylists.getPlaylist(name).list);
        }
    };
});
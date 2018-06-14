app.controller("UserPlaylistsController", function ($rootScope, $scope, $route, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    
    var firstPlaylistName = Object.keys($scope.playlists)[0];
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
    }

    $scope.renamePlaylsit = function (name, newName) {
        var newName = prompt("novo nome");
        userService.savedPlaylists.renamePlaylist(name, newName);
        $route.reload();
    }

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
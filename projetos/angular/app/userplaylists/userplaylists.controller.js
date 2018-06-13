app.controller("UserPlaylistsController", function ($rootScope, $scope, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();

    var firstPlaylistName = Object.keys($scope.playlists)[0];
    $scope.activePlaylist = {
        'name': firstPlaylistName,
        'list': userService.savedPlaylists.getPlaylist(firstPlaylistName)
    };

    $scope.selectPlaylist = function (name) {
        $scope.activePlaylist = {
            'name': name,
            'list': userService.savedPlaylists.getPlaylist(name)
        };
    };

    $scope.deletePlaylsit = function (name) {
        userService.savedPlaylists.deletePlaylist(name);
    }

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'id', id: '123456' }
        },
        playCustomPlaylist: function (name) {
            console.log(userService.savedPlaylists.getPlaylist(name))
            $rootScope.$broadcast('ytPlayCustomPlaylist', userService.savedPlaylists.getPlaylist(name));
        }
    };
});
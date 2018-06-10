app.controller("UserPlaylistsController", function ($rootScope, $scope, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'id', id: '123456' }
        },
        playCustomPlaylist: function (name) {
            console.log(userService.savedPlaylists.getPlaylist(name))
            $rootScope.$broadcast('ytPlayCustomPlaylist', userService.savedPlaylists.getPlaylist(name));
        }
    }
});
app.controller("UserPlaylistsController", function ($rootScope, $scope, $route, $timeout, $location, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    $scope.state = { renamingPlaylist: false };

    setInitialPlaylist();
    function setInitialPlaylist() {
        var pl = 0; // default playlist

        if (typeof $location.search().pl !== "undefined") {
            var tempPl = $location.search().pl;
            if (typeof $scope.playlists[tempPl] !== 'undefined') {
                pl = parseInt(tempPl);
            }
        }

        if (typeof $scope.playlists[pl] !== "undefined") {
            var firstPlaylistName = $scope.playlists[pl].name;
            $scope.activePlaylist = {
                'name': firstPlaylistName,
                'list': userService.savedPlaylists.getPlaylist(firstPlaylistName).list
            };

            $scope.activePlaylist.index = pl;
        }
    }

    $scope.selectPlaylist = function (name) {
        $scope.activePlaylist = {
            'name': name,
            'list': userService.savedPlaylists.getPlaylist(name).list
        };
        
        $location.search('pl', userService.savedPlaylists.getIndex(name));
    };

    $scope.deletePlaylsit = function (name) {
        userService.savedPlaylists.deletePlaylist(name);

        var prev = userService.savedPlaylists.getIndex(name) == 0 ? userService.savedPlaylists.getAllPlaylists().length - 1 : userService.savedPlaylists.getIndex(name) - 1;

        $location.search('pl', prev);
        $route.reload();
    };

    $scope.renamePlaylist = function (name, newName) {
        $scope.state.renamingPlaylist = false;
        if (!userService.savedPlaylists.renamePlaylist(name, newName)) {
            M.toast({
                html: 'Erro ao criar playlist!',
                classes: 'red darken-4',
                displayLength: '3000'
            });
        }
        $route.reload();
    };

    $scope.showInput = function () {
        $scope.state.renamingPlaylist = true;
        setTimeout(function () {
            $$('.playlist-name input')[0].focus();
        }, 100);
    };

    $scope.onBlur = function () {
        $timeout(function () {
            $scope.state.renamingPlaylist = false;
        }, 100);
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
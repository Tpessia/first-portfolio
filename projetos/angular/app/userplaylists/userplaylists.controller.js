app.controller("UserPlaylistsController", function ($rootScope, $scope, $route, $timeout, $location, userService) {
    $scope.playlists = userService.savedPlaylists.getAllPlaylists();
    $scope.state = { renamingPlaylist: false };

    // Redirect

    redirectNotLogged();
    function redirectNotLogged() {
        if (!userService.user.isLogged) {
            $location.search("pl", null);
            $location.path("/");
        }
    }

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
            $scope.activePlaylist = {
                'playlistId': $scope.playlists[pl].playlistId,
                'name': $scope.playlists[pl].name,
                'list': $scope.playlists[pl].list,
                'index': pl
            };
        }
    }

    $scope.selectPlaylist = function (playlistId) {
        var playlist = userService.savedPlaylists.getPlaylist(playlistId),
            index = userService.savedPlaylists.getIndexId(playlistId);
        $scope.activePlaylist = {
            'playlistId': playlist.playlistId,
            'name': playlist.name,
            'list': playlist.list,
            'index': index
        };
        
        $location.search('pl', index);
    };

    $scope.deletePlaylist = function (playlistId) {
        userService.savedPlaylists.deletePlaylist(playlistId).then(function (response) {
            if (typeof response.data.UserID !== "undefined") {
                M.toast({
                    html: 'Playlist deleted',
                    displayLength: '3000'
                });

                var index = userService.savedPlaylists.getIndexId(playlistId),
                    prev = index == 0 ? userService.savedPlaylists.getAllPlaylists().length - 1 : index - 1;

                $location.search('pl', prev);
                $route.reload();
            }
            else {
                M.toast({
                    html: 'Error on playlist deletion',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });

                console.log(response);
            }
        }, function (errResponse) {
            M.toast({
                html: 'Error on playlist deletion',
                classes: 'red darken-4',
                displayLength: '3000'
            });

            console.log(errResponse);
        });
    };

    $scope.renamePlaylist = function (playlistId, newName) {
        $scope.state.renamingPlaylist = false;

        userService.savedPlaylists.renamePlaylist(playlistId, newName).then(function (response) {
            if (typeof response.data.PlaylistID !== "undefined") {
                M.toast({
                    html: 'Playlist renamed',
                    displayLength: '3000'
                });

                $route.reload();
            }
            else {
                M.toast({
                    html: 'Error on playlist creation',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });

                console.log(response);
            }
        }, function (errResponse) {
            M.toast({
                html: 'Error on playlist creation',
                classes: 'red darken-4',
                displayLength: '3000'
            });

            console.log(errResponse);
        });
    };

    $scope.removeTrack = function (playlistId, trackId) {
        userService.savedPlaylists.removeTrack(playlistId, trackId).then(function (response) {
            if (typeof response.data.TrackID !== "undefined") {
                M.toast({
                    html: 'Track removed',
                    displayLength: '3000'
                });
            }
            else {
                M.toast({
                    html: 'Error on track removal',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });

                console.log(response);
            }
        }, function (errResponse) {
            M.toast({
                html: 'Error on track removal',
                classes: 'red darken-4',
                displayLength: '3000'
            });

            console.log(errResponse);
        });
    }

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'id', id: '123456' }
        },
        playCustomPlaylist: function (playlistId) {
            if ($scope.activePlaylist.list.length > 0) {
                $rootScope.$broadcast('ytPlayCustomPlaylist', userService.savedPlaylists.getPlaylist(playlistId).list);
            }
        }
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
        }, 1000);
    };
});
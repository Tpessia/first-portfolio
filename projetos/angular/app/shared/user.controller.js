app.controller("UserController", function ($rootScope, $scope, userService, youTubeService) {

    $scope.userMethods = {a:1};

    // Login

    $scope.userMethods.signIn = function () {
        console.log("sign in");
        return true;
    };

    $scope.userMethods.signUp = function () {
        console.log("sign up");
        return true;
    };

    // Events

    $scope.$on('userSaveTrack', function (event, videoData) {
        // { type: 'track', artist: 'Portugal. The Man', track: 'Noise Pollution' }
        switch (videoData.type) {
            case 'track':
                getTrackId(videoData.artist, videoData.track);
                break;
            case 'album':
                getAlbumTrackIds(videoData.artist, videoData.album);
                break;
            case 'artist':
                getArtistTrackIds(videoData.artist);
                break;
            default:
                throw 'Invalid video type "' + videoData.type + '"';
                break;
        }
    });

    // Video ID getters

    function getTrackId(artist, track) {
        youTubeService.getMusicVideo(artist, track).then(function (response) {
            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                var video = response.data.items[0],
                    id = video.id.videoId;

                userService.savedPlaylists.addTrack('myPlaylist', id);

                console.log(userService.savedPlaylists.getPlaylist('myPlaylist'));
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    function getAlbumTrackIds(artist, album) {
        youTubeService.getAlbumPlaylist(artist, album).then(function (response) {
            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                var playlist = response.data.items[0],
                    id = playlist.id.playlistId, // Playlist's ID
                    videoIds = [];

                    getVideosIds(id, null);
                    function getVideosIds(id, pageToken) {
                        youTubeService.getPlaylistVideos(id, pageToken).then(function (response) {
                            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                                var videos = response.data.items;
                                for (var i in videos) {
                                    videoIds.push(videos[i].contentDetails.videoId);
                                }

                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist('myPlaylist', videoIds);

                                    console.log(userService.savedPlaylists.getPlaylist('myPlaylist'));
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {
                            console.log(errResponse);
                        });
                    }
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    function getArtistTrackIds(artist) {
        youTubeService.getArtistPlaylist(artist).then(function (response) {
            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                var playlist = response.data.items[0],
                    id = playlist.id.playlistId, // Playlist's ID
                    videoIds = [];

                    getVideosIds(id, null);
                    function getVideosIds(id, pageToken) {
                        youTubeService.getPlaylistVideos(id, pageToken).then(function (response) {
                            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                                var videos = response.data.items;
                                for (var i in videos) {
                                    videoIds.push(videos[i].contentDetails.videoId);
                                }

                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist('myPlaylist', videoIds);

                                    console.log(userService.savedPlaylists.getPlaylist('myPlaylist'));
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {
                            console.log(errResponse);
                        });
                    }
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    // TESTE

    $scope.ytVideo = {
        playCustomPlaylist: function (videoData) {
            console.log(userService.savedPlaylists.getPlaylist('myPlaylist'));
            $rootScope.$broadcast('ytPlayCustomPlaylist', userService.savedPlaylists.getPlaylist('myPlaylist'));
        }
    }
});
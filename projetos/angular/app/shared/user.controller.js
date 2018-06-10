app.controller("UserController", function ($rootScope, $scope, userService, youTubeService) {

    $scope.user = userService.user;

    $scope.userMethods = {};

    // Login

    $scope.userMethods.signIn = function () {
        console.log("sign in");
        return true;
    };

    $scope.userMethods.signUp = function () {
        console.log("sign up");
        return true;
    };

    $scope.userMethods.logOut = function () {
        console.log("log out");
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
                    id = video.id.videoId,
                    title = video.snippet.title;

                userService.savedPlaylists.addTrack('myPlaylist', {
                    'id': id,
                    'title': title
                });
                
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
                    videosData = [];

                    getVideosIds(id, null);
                    function getVideosIds(id, pageToken) {
                        youTubeService.getPlaylistVideos(id, pageToken).then(function (response) {
                            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                                var videos = response.data.items;

                                for (var i in videos) {
                                    videosData.push({
                                        id: videos[i].contentDetails.videoId,
                                        title: videos[i].snippet.title
                                    });
                                }
                                
                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist('myPlaylist', videosData);

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
                    videosData = [];

                    getVideosIds(id, null);
                    function getVideosIds(id, pageToken) {
                        youTubeService.getPlaylistVideos(id, pageToken).then(function (response) {
                            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                                var videos = response.data.items;
                                for (var i in videos) {
                                    videosData.push({
                                        id: videos[i].contentDetails.videoId,
                                        title: videos[i].snippet.title
                                    });
                                }

                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist('myPlaylist', videosData);

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
});
app.controller("UserController", function ($rootScope, $scope, userService, youTubeService) {

    $scope.user = userService.user;

    $scope.userMethods = {};

    // Login

    $scope.userMethods.signIn = function () {
        console.log("sign in");
        return true;
    };

    $scope.userMethods.signUp = function (data) {
        return userService.signUp(data).then(function (response) {
            if (response.data == "1") {
                userService.user.isLogged = true;
                // userService.user.avatar = $rootScope.baseUrl + 'assets/img/yuna.jpg';
                userService.user.name = data.username;
                userService.user.email = data.email;

                userService.userSecure.username = data.username;
            }
            return response;
        });
    };

    $scope.userMethods.logOut = function () {
        userService.user.isLogged = false;
        // userService.user.avatar = $rootScope.baseUrl + 'assets/img/yuna.jpg';
        userService.user.name = "";
        userService.user.email = "";

        userService.userSecure.username = "";
        return true;
    };

    // Events

    $scope.$on('userSaveTrack', function (event, data) {
        // { type: 'track', artist: 'Portugal. The Man', track: 'Noise Pollution' }
        switch (data.videoData.type) {
            case 'track':
                getTrackId(data.playlistName, data.videoData.artist, data.videoData.track);
                break;
            case 'album':
                getAlbumTrackIds(data.playlistName, data.videoData.artist, data.videoData.album);
                break;
            case 'artist':
                getArtistTrackIds(data.playlistName, data.videoData.artist);
                break;
            default:
                throw 'Invalid video type "' + data.videoData.type + '"';
                break;
        }
    });

    // Video ID getters

    function getTrackId(playlistName, artist, track) {
        youTubeService.getMusicVideo(artist, track).then(function (response) {
            if (typeof response.data.error === "undefined" && typeof response.data.error === "undefined") {
                var video = response.data.items[0],
                    id = video.id.videoId,
                    title = video.snippet.title;
                    
                userService.savedPlaylists.addTrack(playlistName, {
                    'id': id,
                    'title': title,
                    'img': video.snippet.thumbnails.medium.url
                });
                
                console.log(userService.savedPlaylists.getPlaylist(playlistName));
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    function getAlbumTrackIds(playlistName, artist, album) {
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
                                        'id': videos[i].contentDetails.videoId,
                                        'title': videos[i].snippet.title,
                                        'img': videos[i].snippet.thumbnails.medium.url
                                    });
                                }
                                
                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist(playlistName, videosData);

                                    console.log(userService.savedPlaylists.getPlaylist(playlistName));
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

    function getArtistTrackIds(playlistName, artist) {
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
                                        'id': videos[i].contentDetails.videoId,
                                        'title': videos[i].snippet.title,
                                        'img': videos[i].snippet.thumbnails.medium.url
                                    });
                                }

                                if (typeof response.data.nextPageToken !== "undefined") { // tem mais páginas?
                                    getVideosIds(id, response.data.nextPageToken);
                                }
                                else { // se não, adiciona todos os dados
                                    userService.savedPlaylists.appendPlaylist(playlistName, videosData);

                                    console.log(userService.savedPlaylists.getPlaylist(playlistName));
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
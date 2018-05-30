app.controller("YTPlayerController", function ($rootScope, $scope, $sce, youTubeService) {
    $scope.isOpen = false;

    $scope.close = function () {
        $scope.isOpen = false;
    }

    $scope.getVideoId = function(artist, track) {
        youTubeService.getMusicVideo(artist, track).then(function (response) {
            var video = response.data.items[0],
                id = video.id.videoId;

            $scope.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id + '/?autoplay=1');
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    $scope.getPlaylistId = function (artist, album) {
        youTubeService.getMusicPlaylist(artist, album).then(function (response) {
            var playlist = response.data.items[0],
                id = playlist.id.playlistId;
                
            $scope.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/videoseries?list=' + id + '&autoplay=1');
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    $scope.$on('ytPlayVideo', function ( event, videoData ) {
        switch (videoData.type) {
            case 'video':
                $scope.isOpen = true;
                $scope.getVideoId(videoData.artist, videoData.track);
                break;
            case 'playlist':
                $scope.isOpen = true;
                $scope.getPlaylistId(videoData.artist, videoData.album);
                break;
            default:
                throw "Invalid video type";
                break;
        }
    });

    // Na Controller que chama o YouTube:
    // $scope.ytPlayVideo = function(videoData) {
    //     $rootScope.$broadcast('ytPlayVideo', videoData);
    //     // { type: 'video', artist: 'Portugal. The Man', track: 'Noise Pollution' }
    // }
});
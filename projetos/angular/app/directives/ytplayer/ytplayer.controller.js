app.controller("YTPlayerController", function ($rootScope, $scope, $sce, youTubeService) {
    $scope.isOpen = false;
    $scope.isExpanded = false;
    $scope.isVisible = true;

    $scope.close = function () {
        $scope.isOpen = false;
    }

    $scope.expand = function () {
        $scope.isExpanded = !$scope.isExpanded;
    }

    $scope.visibility = function () {
        $scope.isVisible = !$scope.isVisible;
    }

    $scope.getTrackVideo = function(artist, track) {
        youTubeService.getMusicVideo(artist, track).then(function (response) {
            var video = response.data.items[0],
                id = video.id.videoId;

            $scope.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id + '/?autoplay=1');
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    $scope.getAlbumPlaylist = function (artist, album) {
        youTubeService.getAlbumPlaylist(artist, album).then(function (response) {
            var playlist = response.data.items[0],
                id = playlist.id.playlistId;
                
            $scope.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/videoseries?list=' + id + '&autoplay=1');
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    $scope.getArtistPlaylist = function (artist) {
        youTubeService.getArtistPlaylist(artist).then(function (response) {
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
                $scope.getTrackVideo(videoData.artist, videoData.track);
                break;
            case 'playlist':
                $scope.isOpen = true;
                $scope.getAlbumPlaylist(videoData.artist, videoData.album);
                break;
            case 'artist':
                $scope.isOpen = true;
                $scope.getArtistPlaylist(videoData.artist);
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
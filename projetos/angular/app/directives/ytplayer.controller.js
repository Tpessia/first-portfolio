app.controller("YTPlayerController", function ($scope, $sce, youTubeService) {
    $scope.getVideoId = function(artist, track) {
        youTubeService.getMusicVideo(artist, track).then(function (response) {
            var video = response.data.items[0],
                id = video.id.videoId;

            $scope.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id);
        }, function (errResponse) {
            console.log(errResponse)
        });
    }

    $scope.$on('ytPlayerRefresh', function ( event, videoData ) {
        switch (videoData.type) {
            case 'video':
                $scope.getVideoId(videoData.artist, videoData.track);
                break;
            // case 'playlist':

            //     break;
            default:
                throw "Invalid video type";
                break;
        }
    });    

    // Na Controller que chama o YouTube:
    // $scope.ytPlayerRefresh = function(videoData) {
    //     $rootScope.$broadcast('ytPlayerRefresh', videoData);
    //     // { type: 'video', artist: 'Portugal. The Man', track: 'Noise Pollution' }
    // }
});
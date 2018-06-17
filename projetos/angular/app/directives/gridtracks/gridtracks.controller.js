app.controller("GridTracksController", function ($rootScope, $scope) {
    $scope.cutStr = function (text, letters) {
        return text.length > letters ? text.substr(0, letters) + "..." : text;
    };

    // User options

    $scope.saveOnPlaylist = function (playlistId, videoData) {
        $rootScope.$broadcast('userSaveTrack', {
            'playlistId': playlistId,
            'videoData': videoData
        });
    }

    // Youtube caller

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'video', artist: 'Portugal. The Man', track: 'Noise Pollution' }
        }
    }

    // Search on click

    $scope.searchFor = function (type, value) {
        switch (type) {
            case 'track':
                return $rootScope.baseUrl + '#!/tracks?search=' + value;
                break;
            case 'artist':
                return $rootScope.baseUrl + '#!/artists?search=' + value;
                break;
            case 'album':
                return $rootScope.baseUrl + '#!/albums?search=' + value;
                break;
            default:
                throw 'Invalid video type "' + type + '"';
                break;
        }
    };
});
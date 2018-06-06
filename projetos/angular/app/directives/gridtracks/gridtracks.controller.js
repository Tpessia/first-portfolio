app.controller("GridTracksController", function ($rootScope, $scope) {
    $scope.cutStr = function (text, letters) {
        return text.length > letters ? text.substr(0, letters) + "..." : text;
    };

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'video', artist: 'Portugal. The Man', track: 'Noise Pollution' }
        }
    }
});
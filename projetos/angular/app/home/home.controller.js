app.controller("HomeController", function ($scope, topsService) {
    topsService.getTopTracks.then(function (response) {
        $scope.tracks = response.data.tracks.track;
        console.log(response.data);
    });

    topsService.getTopArtists.then(function (response) {
        $scope.artists = response.data.artists.artist;
        console.log(response.data);
    });

    topsService.getTopTags.then(function (response) {
        $scope.tags = response.data.tags.tag;
        console.log(response.data);
    });
});
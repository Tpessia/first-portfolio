app.controller("HomeController", function ($scope, topsService) {

    // Make functions available for Pagination Directive
    $scope.getTopTracks = function(page) {
        topsService.getTopTracks(page).then(function (response) {
            $scope.tracks = response.data.tracks.track.slice(-5);
            console.log(response.data);
        });
    };

    $scope.getTopArtists = function (page) {
        topsService.getTopArtists(page).then(function (response) {
            $scope.artists = response.data.artists.artist.slice(-5);
            console.log(response.data);
        });
    };

    $scope.getTopTags = function (page) {
        topsService.getTopTags(page).then(function (response) {
            $scope.tags = response.data.tags.tag.slice(-5);
            console.log(response.data);
        });
    };

    $scope.getTopTracks(1);
    $scope.getTopArtists(1);
    $scope.getTopTags(1);
});
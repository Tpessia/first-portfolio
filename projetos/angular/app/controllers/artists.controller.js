app.controller("ArtistsController", function ($scope, artistsService) {
    $scope.page = "Artists";

    $scope.artists = artistsService.getArtists();

    $scope.addArtist = function(artist) {
        artistsService.add(artist);
    };

    $scope.addTemp = function(artist) {
        $scope.artists.push(artist);
    }
});
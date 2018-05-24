app.controller("HomeController", function ($scope, topsService) {

    // Make functions available for Pagination Directive
    $scope.getTopTracks = function(page) {
        var progressBar = $$('#tracks-wrapper .progress');

        angular.element(progressBar).removeClass('hide');

        topsService.getTopTracks(page).then(function (response) {
            angular.element(progressBar).addClass('hide');

            $scope.tracks = response.data.tracks.track.slice(-5);

            console.log(response.data);
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    $scope.getTopArtists = function (page) {
        var progressBar = $$('#artists-wrapper .progress');

        angular.element(progressBar).removeClass('hide');
        
        topsService.getTopArtists(page).then(function (response) {
            angular.element(progressBar).addClass('hide');

            $scope.artists = response.data.artists.artist.slice(-5);

            console.log(response.data);
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    $scope.getTopTags = function (page) {
        var progressBar = $$('#tags-wrapper .progress');

        angular.element(progressBar).removeClass('hide');

        topsService.getTopTags(page).then(function (response) {
            angular.element(progressBar).addClass('hide');

            $scope.tags = response.data.tags.tag.slice(-5);

            console.log(response.data);
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    // $scope.getTopTracks(1);
    // $scope.getTopArtists(1);
    // $scope.getTopTags(1);
});
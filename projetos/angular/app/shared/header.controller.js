app.controller("HeaderController", function ($scope, $location, topsService) {
    $scope.navItens = [{
            text: 'Home',
            url: '/'
        }, {
            text: 'Tracks',
            url: '/tracks'
        }, {
            text: 'Artists',
            url: '/artists'
        }, {
            text: 'Albums',
            url: '/albums'
        }
    ];
    
    $scope.isActive = function(url) {
        return url == $location.path();
    };

    $scope.topsImg = {};

    getTopTracks();
    function getTopTracks() {
        var fallbackImg = '../assets/img/logo-simple-256x256.png';

        topsService.getTheTopTrack().then(function (response) {
            $scope.topsImg.img1 = response.data.tracks.track[0].image.pop()['#text'];
        }, function (errResponse) {
            $scope.topsImg.img1 = fallbackImg;

            console.log("Error while fetching tops (header) images: " + errResponse);
        });

        topsService.getTheTopArtist().then(function (response) {
            $scope.topsImg.img2 = response.data.artists.artist[0].image.pop()['#text'];
        }, function (errResponse) {
            $scope.topsImg.img2 = fallbackImg;

            console.log("Error while fetching tops (header) images: " + errResponse);
        });

        topsService.getTheTopTag().then(function (response) {
            var tag = response.data.tags.tag[0].name;
            topsService.getTopArtistsByTag(tag).then(function (response) {
                $scope.topsImg.img3 = response.data.topartists.artist[0].image.pop()['#text'];
            }, function (errResponse) {
                $scope.topsImg.img3 = fallbackImg;

                console.log("Error while fetching tops (header) images: " + errResponse);
            });
        });
    };
});
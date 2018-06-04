app.controller("HeaderController", function ($scope, $location, $window, topsService) {
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

    getHeaderImgs();
    function getHeaderImgs() {

        $scope.headerImgs = {};

        var dft = {
            page: 1,
            limit: 5
        };

        var fallbackImg = $window.location.pathname + 'assets/img/logo-simple-256x256.png';

        $scope.headerImgs.img1 = fallbackImg;
        $scope.headerImgs.img2 = fallbackImg;
        $scope.headerImgs.img3 = fallbackImg;

        topsService.getTopTracks(dft.page, dft.limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                    if (typeof response.data.tracks !== "undefined") {
                        if (typeof response.data.tracks.track[0].image !== "undefined" && response.data.tracks.track[0].image[0]["#text"] != "") {
                            
                            $scope.headerImgs.img1 = getUniqueImg(response.data.tracks.track, $scope.headerImgs, fallbackImg);
                            
                        }
                    }
                } else {
                    console.log(response);
                }
        }, function (errResponse) {
            $scope.headerImgs.img1 = fallbackImg;

            console.log("Error while fetching tops (header) images: " + errResponse);
        });

        topsService.getTopArtists(dft.page, dft.limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                    if (typeof response.data.artists !== "undefined") {
                        if (typeof response.data.artists.artist[0].image !== "undefined" && response.data.artists.artist[0].image[0]["#text"] != "") {

                            $scope.headerImgs.img2 = getUniqueImg(response.data.artists.artist, $scope.headerImgs, fallbackImg);
                            
                        }
                    }
                } else {
                    console.log(response);
                }
        }, function (errResponse) {
            $scope.headerImgs.img2 = fallbackImg;

            console.log("Error while fetching tops (header) images: " + errResponse);
        });

        topsService.getTopTags(dft.page, dft.limit).then(function (response) {
            var tag = response.data.tags.tag[0].name;
            topsService.getTopArtistsByTag(tag).then(function (response) {
                if (typeof response.data.error === "undefined") {
                    if (typeof response.data.topartists !== "undefined") {
                        if (typeof response.data.topartists.artist[0].image !== "undefined" && response.data.topartists.artist[0].image[0]["#text"] != "") {

                            $scope.headerImgs.img3 = getUniqueImg(response.data.topartists.artist, $scope.headerImgs, fallbackImg);;
                            
                        }
                    }
                } else {
                    console.log(response);
                }
            }, function (errResponse) {
                $scope.headerImgs.img3 = fallbackImg;

                console.log("Error while fetching tops (header) images: " + errResponse);
            });
        });

        function getUniqueImg(dataArray, headerImgs, fallbackImg) {
            var img = "";

            for (var i in dataArray) {
                img = dataArray[i].image.pop()['#text'];

                for (var j in headerImgs) {
                    if (img == headerImgs[j]) {
                        img = "";
                        break;
                    }
                }

                if (img != "") {
                    break;
                }
            }

            if (img == "") {
                img = fallbackImg;
            }
            
            return img;
        }
    };
});
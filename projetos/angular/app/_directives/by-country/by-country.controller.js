app.controller("ByCountryController", function ($rootScope, $scope, geoService, tracksService, artistsService) {
    var dft = {
        page: 1,
        limit: 5
    };

    $scope.getTracksByCountry = function (page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        geoService.getTracksByCountry('Brazil', page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.crountryTracks = response.data.tracks.track.slice(-limit);

                for (var i in $scope.crountryTracks) {
                    (function (j) {
                        tracksService.getTrackInfo($scope.crountryTracks[j].artist.name, $scope.crountryTracks[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.track !== "undefined") {
                                    $scope.crountryTracks[j].info = response.data.track;
                                    if (typeof response.data.track.album !== "undefined" && response.data.track.album.image[0]["#text"] != "") {
                                        $scope.crountryTracks[j].image = response.data.track.album.image;
                                    }
                                }
                            }
                            else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse)
                        }).finally(function () {
                            if ($scope.crountryTracks[j].image !== "undefined" && $scope.crountryTracks[j].image[0]["#text"] == "") {
                                $scope.crountryTracks[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.crountryTracks[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function(errResponse) {
            console.log(errResponse);
        });
    };
    $scope.getTracksByCountry(1, 5);

    $scope.getArtistsByCountry = function (page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        geoService.getArtistsByCountry('Brazil', page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.crountryArtists = response.data.topartists.artist.slice(-limit);

                for (var i in $scope.crountryArtists) {
                    (function (j) {
                        artistsService.getArtistInfo($scope.crountryArtists[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.artist !== "undefined") {
                                    $scope.crountryArtists[j].info = response.data.artist;
                                    if (typeof response.data.artist.image !== "undefined" && response.data.artist.image[0]["#text"] != "") {
                                        $scope.crountryArtists[j].image = response.data.artist.image;
                                    }
                                }
                            }
                            else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse)
                        }).finally(function () {
                            if ($scope.crountryArtists[j].image !== "undefined" && $scope.crountryArtists[j].image[0]["#text"] == "") {
                                $scope.crountryArtists[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.crountryArtists[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function(errResponse) {
            console.log(errResponse);
        });
    };
    $scope.getArtistsByCountry(1, 5);

    // Helpers

    $scope.stripLink = function (text) {
        return text.replace(/<a(.|\n)*?<\/a>.?/, '').trim();
    }

    $scope.getSummaryLink = function (text) {
        return text.match(/<a(.|\n)*?<\/a>/)[0].match(/href="(.|\n)*?"/)[0].replace('href="', '').replace('"', '');
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
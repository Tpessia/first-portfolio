app.controller("HomeController", function ($rootScope, $scope, topsService, tracksService) {

    var dft = {
        page: 1,
        limit: 5
    };

    $scope.getRandomTracks = function (limit) {
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        var page = 1 + Math.floor(Math.random() * 14);

        topsService.getTopTracks(page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.rndTracks = response.data.tracks.track.slice(-limit);

                for (var i in $scope.rndTracks) {
                    (function (j) {
                        tracksService.getTrackInfo($scope.rndTracks[j].artist.name, $scope.rndTracks[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.track !== "undefined") {
                                    $scope.rndTracks[j].info = response.data.track;
                                    if (typeof response.data.track.album !== "undefined" && response.data.track.album.image[0]["#text"] != "") {
                                        $scope.rndTracks[j].image = response.data.track.album.image;
                                    }
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.rndTracks[j].image !== "undefined" && $scope.rndTracks[j].image[0]["#text"] == "") {
                                $scope.rndTracks[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.rndTracks[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            $scope.rndTracks = $scope.tracks;

            console.log(errResponse);
        });
    };
    $scope.getRandomTracks(5);

    // Make functions available for Pagination Directive
    $scope.getTopTracks = function(page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        var progressBar = $$('#tracks-wrapper .progress');

        angular.element(progressBar).removeClass('hide');

        topsService.getTopTracks(page, limit).then(function (response) {
            angular.element(progressBar).addClass('hide');

            if (typeof response.data.error === "undefined") {
                $scope.tracks = response.data.tracks.track.slice(-limit);

                for (var i in $scope.tracks) {
                    (function (j) {
                        tracksService.getTrackInfo($scope.tracks[j].artist.name, $scope.tracks[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.track !== "undefined") {
                                    $scope.tracks[j].info = response.data.track;
                                    if (typeof response.data.track.album !== "undefined" && response.data.track.album.image[0]["#text"] != "") {
                                        $scope.tracks[j].image = response.data.track.album.image;
                                    }
                                }
                            }
                            else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse)
                        }).finally(function () {
                            if ($scope.tracks[j].image !== "undefined" && $scope.tracks[j].image[0]["#text"] == "") {
                                $scope.tracks[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.tracks[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    $scope.getTopArtists = function (page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            limit = dft.limit;
        }

        var progressBar = $$('#artists-wrapper .progress');

        angular.element(progressBar).removeClass('hide');
        
        topsService.getTopArtists(page, limit).then(function (response) {
            angular.element(progressBar).addClass('hide');

            if (typeof response.data.error === "undefined") {
                $scope.artists = response.data.artists.artist.slice(-limit);

                for (var i in $scope.artists) {
                    $scope.artists[i].imgsDone = true;
                }
            }
            else {
                console.log(response);
            }
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    $scope.getTopTags = function (page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        var progressBar = $$('#tags-wrapper .progress');

        angular.element(progressBar).removeClass('hide');

        topsService.getTopTags(page, limit).then(function (response) {
            angular.element(progressBar).addClass('hide');

            if (typeof response.data.error === "undefined") {
                $scope.tags = response.data.tags.tag.slice(-limit);

                for (var i in $scope.tags) {
                    (function(j) {
                        $scope.tags[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];

                        topsService.getTopArtistsByTag($scope.tags[j].name, page, limit).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                $scope.tags[j].image = response.data.topartists.artist[0].image;
                            }
                            else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.tags[j].image !== "undefined" && $scope.tags[j].image[0]["#text"] == "") {
                                $scope.tags[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.tags[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function(errResponse) {
            angular.element(progressBar).addClass('hide');

            console.log(errResponse);
        });
    };

    $scope.searchFor = function (type, value) {
        switch(type) {
            case 'track':
                return $rootScope.baseUrl + '#!/tracks?search=' + value;
                break;
            case 'artist':
                return $rootScope.baseUrl + '#!/artists?search=' + value;
                break;
            default:
                throw 'Invalid video type "' + type + '"';
                break;
        }
    };
});
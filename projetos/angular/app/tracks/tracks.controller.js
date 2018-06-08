app.controller("TracksController", function ($rootScope, $scope, $routeParams, $location, tracksService, topsService) {
    var dft = {
        page: 1,
        limit: 5
    };

    // Content control

    getTopTracks(1, 5);
    function getTopTracks(page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        topsService.getTopTracks(page, limit).then(function (response) {
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
                            } else {
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
        }, function (errResponse) {
            console.log(errResponse);
        });
    };

    $scope.getTrackSearch = function (track, page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        tracksService.getTrackSearch(track, page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.searchedTracks = response.data.results.trackmatches.track.slice(-limit);

                for (var i in $scope.searchedTracks) {
                    (function (j) {
                        tracksService.getTrackInfo($scope.searchedTracks[j].artist, $scope.searchedTracks[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.track !== "undefined") {
                                    $scope.searchedTracks[j].info = response.data.track;
                                    if (typeof response.data.track.album !== "undefined" && response.data.track.album.image[0]["#text"] != "") {
                                        $scope.searchedTracks[j].image = response.data.track.album.image;
                                    }
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.searchedTracks[j].image !== "undefined" && $scope.searchedTracks[j].image[0]["#text"] == "") {
                                $scope.searchedTracks[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.searchedTracks[j].imgsDone = true;
                        });
                    })(i)
                }
            }
            else {
                console.log(response);
            }
        }, function (errResponse) {
            console.log(errResponse);
        });
    };

    // Events

    $scope.onSearch = function (searchKey) {
        if (validate(searchKey)) {
            $location.search('search', searchKey); // url search param set
            $scope.hideTop = true; // switch from "Trending" to "Search" sub view
            $scope.isSearch = false; // Reset view if research
            setTimeout(function () {
                $scope.isSearch = true;
                $scope.searchKey = searchKey;

                $scope.getTrackSearch($scope.searchKey, dft.page, dft.limit);
            }, 10);
            return true;
        }

        return false;

        function validate(key) {
            if (typeof key !== "undefined" && key != '') {
                return true;
            }
            else {
                return false;
            }
        }
    }

    $scope.onClose = function () {
        $scope.hideTop = false;
        $scope.isSearch = false;
    }

    $scope.onPageChange = function (page) {
        $scope.getTrackSearch($scope.searchKey, page, dft.limit);
    }

    // Youtube caller

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'video', artist: 'Portugal. The Man', track: 'Noise Pollution' }
        }
    }

    // Routing for search url param

    searchParamControl();
    function searchParamControl() {
        if (typeof $location.search().search !== "undefined") {
            var searchParam = $location.search().search;

            $scope.onSearch(searchParam);
            $scope.searchKey = searchParam;
        }
    }

    // Helpers

    $scope.formatDuration = function(time) {
        var minutes = Math.floor((time / 60) / 1000);
        var seconds = Math.round(((time / 60) / 1000 - Math.floor((time / 60) / 1000)) * 60);

        seconds = seconds < 10 ? seconds + "0" : seconds;

        return minutes + ":" + seconds;
    }
});
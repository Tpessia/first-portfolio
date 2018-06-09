app.controller("ArtistsController", function ($rootScope, $scope, $routeParams, $location, artistsService, topsService) {
    var dft = {
        page: 1,
        limit: 5
    };

    // Content control

    getTopArtists(1, 5);
    function getTopArtists(page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        topsService.getTopArtists(page, limit).then(function (response) {

            if (typeof response.data.error === "undefined") {
                $scope.artists = response.data.artists.artist.slice(-limit);

                for (var i in $scope.artists) {
                    (function (j) {
                        artistsService.getArtistInfo($scope.artists[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.artist !== "undefined") {
                                    $scope.artists[j].info = response.data.artist;
                                    if (typeof response.data.artist.image !== "undefined" && response.data.artist.image[0]["#text"] != "") {
                                        $scope.artists[j].image = response.data.artist.image;
                                    }
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.artists[j].image !== "undefined" && $scope.artists[j].image[0]["#text"] == "") {
                                $scope.artists[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.artists[j].imgsDone = true;
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

    $scope.getArtistSearch = function (artist, page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        artistsService.getArtistSearch(artist, page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.searchedArtists = response.data.results.artistmatches.artist.slice(-limit);

                for (var i in $scope.searchedArtists) {
                    (function (j) {
                        artistsService.getArtistInfo($scope.searchedArtists[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.artist !== "undefined") {
                                    $scope.searchedArtists[j].info = response.data.artist;
                                    if (typeof response.data.artist.image !== "undefined" && response.data.artist.image[0]["#text"] != "") {
                                        $scope.searchedArtists[j].image = response.data.artist.image;
                                    }
                                }
                            } else {
                                console.log(response.data);
                            }
                        }, function (errResponse) {                            
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.searchedArtists[j].image !== "undefined" && $scope.searchedArtists[j].image[0]["#text"] == "") {
                                $scope.searchedArtists[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.searchedArtists[j].imgsDone = true;
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

                $scope.getArtistSearch(searchKey, dft.page, dft.limit);
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
        $scope.getArtistSearch($scope.searchKey, page, dft.limit);
    }

    // Youtube caller

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'artist', artist: 'Portugal. The Man' }
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

    $scope.stripLink = function (text) {
        return text.replace(/<a(.|\n)*?<\/a>/, '').trim();
    }
});
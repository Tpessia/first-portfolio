app.controller("AlbumsController", function ($rootScope, $scope, $routeParams, $location, albumsService, topsService, artistsService) {
    var dft = {
        page: 1,
        limit: 5
    };

    // Content control

    getTopAlbums(1, 5);
    function getTopAlbums(page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        topsService.getTopArtists(page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.albums = [];
                var topArtists = response.data.artists.artist;

                for (var i in topArtists) {
                    (function (j) {
                        var artist = topArtists[j].name,
                            rndPage = 1 + Math.floor(Math.random() * 2);

                        artistsService.getTopAlbums(artist, rndPage, 1).then(function (response) { // get random album
                            if (typeof response.data.error === "undefined") {
                                var rndAlbum = response.data.topalbums.album.pop();

                                if (typeof rndAlbum !== "undefined") {
                                    $scope.albums[j] = rndAlbum;

                                    albumsService.getAlbumInfo(rndAlbum.artist.name, rndAlbum.name).then(function (response) {
                                        if (typeof response.data.error === "undefined") {
                                            if (typeof response.data.album !== "undefined") {
                                                $scope.albums[j].info = response.data.album;
                                                if (typeof response.data.album.image !== "undefined" && response.data.album.image[0]["#text"] != "") {
                                                    $scope.albums[j].image = response.data.album.image;
                                                }
                                            }
                                        }
                                        else {
                                            console.log(response);
                                        }
                                    }, function (errResponse) {
                                        console.log(errResponse);
                                    }).finally(function () {
                                        if ($scope.albums[j].image !== "undefined" && $scope.albums[j].image[0]["#text"] == "") {
                                            $scope.albums[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                                        }

                                        $scope.albums[j].imgsDone = true;
                                    });
                                }
                            } else {
                                console.log(response);
                            }
                        }, function (errResponse) {
                            console.log(errResponse)
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

    $scope.getAlbumSearch = function (album, page, limit) {
        if (typeof page === "undefined") {
            var page = dft.page;
        }
        if (typeof limit === "undefined") {
            var limit = dft.limit;
        }

        albumsService.getAlbumSearch(album, page, limit).then(function (response) {
            if (typeof response.data.error === "undefined") {
                $scope.searchedAlbums = response.data.results.albummatches.album.slice(-limit);

                for (var i in $scope.searchedAlbums) {
                    (function (j) {
                        albumsService.getAlbumInfo($scope.searchedAlbums[j].artist, $scope.searchedAlbums[j].name).then(function (response) {
                            if (typeof response.data.error === "undefined") {
                                if (typeof response.data.album !== "undefined") {
                                    $scope.searchedAlbums[j].info = response.data.album;
                                    if (typeof response.data.album.image !== "undefined" && response.data.album.image[0]["#text"] != "") {
                                        $scope.searchedAlbums[j].image = response.data.album.image;
                                    }
                                }
                            } else {
                                console.log(response.data);
                            }
                        }, function (errResponse) {                                
                            console.log(errResponse);
                        }).finally(function () {
                            if ($scope.searchedAlbums[j].image !== "undefined" && $scope.searchedAlbums[j].image[0]["#text"] == "") {
                                $scope.searchedAlbums[j].image = [{'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}, {'#text': $rootScope.fallbackImg}];
                            }

                            $scope.searchedAlbums[j].imgsDone = true;
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

                $scope.getAlbumSearch($scope.searchKey, dft.page, dft.limit);
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
        $scope.getAlbumSearch($scope.searchKey, page, dft.limit);
    }
    
    // Youtube caller

    $scope.ytVideo = {
        open: function (videoData) {
            $rootScope.$broadcast('ytPlayVideo', videoData);
            // { type: 'playlist', artist: 'Portugal. The Man', album: 'Woodstock' }
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

    $scope.getArtistUrlFromString = function (strUrl) {
        var pathToArtist = "https://www.last.fm/music/";
        var artist = strUrl.split(pathToArtist)[1].split("/")[0];
        return pathToArtist + artist;
    }

    $scope.stripLink = function (text) {
        return text.replace(/<a(.|\n)*?<\/a>/, '').trim();
    }

    $scope.getSummaryLink = function (text) {
        return text.match(/<a(.|\n)*?<\/a>/)[0].match(/href="(.|\n)*?"/)[0].replace('href="', '').replace('"', '');
    }
});
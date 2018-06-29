app.controller("SearchController", function ($scope, $location, $q, tracksService, artistsService, albumsService) {
    $scope.searchAvailable = true;

    $scope.onSubmit = function(key) {
        var searchSuccess = $scope.onSearch({ searchKey: key });
        if (searchSuccess) {
            $scope.searchAvailable = false;
            $$(".search-wide input")[0].blur();
        }
        else {
            M.toast({
                html: 'Invalid search',
                classes: 'red darken-4',
                displayLength: '2000'
            });
        }
    }

    $scope.close = function() {
        $location.search('search', null);
        $scope.searchAvailable = true;
        angular.element($$(".search-wide input")).val('');
        $scope.onClose();
    }

    $scope.$watch('key', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            // Unlock search

            $scope.searchAvailable = true;

            // Autocomplete

            if (typeof $scope.autocompleteAbort !== "undefined") {
                $scope.autocompleteAbort.resolve();
            }

            $scope.autocompleteAbort = $q.defer();

            var instance = $scope.instances.autocomplete[0],
                limit = instance.options.limit;
                
            tracksService.getTrackSearch(newVal, 1, limit, $scope.autocompleteAbort.promise).then(function (response) {
                if (typeof response.data.error === "undefined" && typeof response.data.results !== "undefined") {
                    var tracks = response.data.results.trackmatches.track,
                        autoTracks = {};

                    for (var i in tracks) {
                        var name = tracks[i].name;

                        autoTracks[name] = null;
                    }

                    instance.updateData(autoTracks);
                }
                else {
                    console.log(response);
                }
            }, function (errResponse) {
                if (errResponse.xhrStatus != "abort") {
                    console.log(errResponse);
                }
            });
        }
    });

    searchParamControl();
    function searchParamControl() {
        if (typeof $location.search().search !== "undefined") {
            var searchParam = $location.search().search;

            $scope.key = searchParam;
            $scope.onSubmit(searchParam);
        }
    }
});
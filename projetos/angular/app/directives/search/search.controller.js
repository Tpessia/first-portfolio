app.controller("SearchController", function ($scope, $location) {
    $scope.searchAvailable = true;

    $scope.onSubmit = function(key) {
        var searchSuccess = $scope.onSearch({ searchKey: key });
        if (searchSuccess) {
            $scope.searchAvailable = false;
            angular.element($$(".search-wide input")).triggerHandler("blur");
        }
        else {
            M.toast({
                html: 'Pesquisa Inválida!',
                classes: 'red darken-4',
                displayLength: '3000'
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
            $scope.searchAvailable = true;
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
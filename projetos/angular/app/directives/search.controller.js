app.controller("SearchController", function ($scope) {
    // Action Function

    $scope.onSubmit = function(key) {
        var searchSuccess = $scope.onSearch({ searchKey: key });
        if (searchSuccess) {
            $scope.searching = true;
            angular.element($$(".search-wide input")).triggerHandler("blur");
        }
        else {
            alert("Pesquisa Inválida!");
        }
    }

    $scope.close = function() {
        $scope.onClose();
        $scope.searching = false;
        angular.element($$(".search-wide input")).val('')
    }

    $scope.$watch('key', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.searching = false;
        }
    });
});
app.controller("PaginationController", function ($scope) {

    // Pagination Logic

    $scope.currentPage = 1;
    $scope.lastPage = 1;
    $scope.offsetPage = 0;

    $scope.nextPage = function() {
        $scope.lastPage = $scope.currentPage;
        if ($scope.currentPage + 1 == $scope.offsetPage + $scope.maxPage) { // if next page equals last page on grid, advance grid
            $scope.offsetPage++;
        }
        $scope.currentPage += 1;
    };

    $scope.prevPage = function () {
        $scope.lastPage = $scope.currentPage;
        if ($scope.currentPage - 1 <= 0) { // prevent prev page <= 0
            return false;
        }
        if ($scope.currentPage - 1 == $scope.offsetPage + 1 && $scope.currentPage - 2 > 0) { // if prev page equals first page on grid, return grid && prevent prev page <= 0
            $scope.offsetPage--;
        }
        $scope.currentPage -= 1;
    };

    $scope.goToPage = function (page) {
        $scope.lastPage = $scope.currentPage;
        if (page == $scope.offsetPage + $scope.maxPage) { // // if next page equals last page on grid, advance grid
            $scope.offsetPage++;
        } else if (page == $scope.offsetPage + 1 && page - 1 != 0) { // if prev page equals first page on grid, return grid && prevent prev page <= 0
            $scope.offsetPage--;
        }         
        $scope.currentPage = page;
    };

    $scope.getNumber = function (num) {
        return new Array(num);
    };

    // Action Function

    $scope.$watch('currentPage', function (newVal, oldVal) {
        // if (newVal !== oldVal) { // prevent running on start
            $scope.pageChangeFunc({ page: newVal });
        // }
    });
});
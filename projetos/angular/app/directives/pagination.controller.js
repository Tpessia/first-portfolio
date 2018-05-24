app.controller("PaginationController", function ($scope) {

    // Pagination Logic

    $scope.currentPage = 1;
    $scope.offsetPage = 0;

    $scope.nextPage = function() {
        if ($scope.currentPage + 1 == $scope.offsetPage + $scope.maxPage) { // if next page equals last page on grid, advance grid
            $scope.offsetPage++;
        }
        $scope.currentPage += 1;
        console.log("$scope.currentPage " + $scope.currentPage)
        console.log("$scope.offsetPage " + $scope.offsetPage)
    };

    $scope.prevPage = function () {
        if ($scope.currentPage - 1 <= 0) { // prevent prev page <= 0
            return false;
        }
        if ($scope.currentPage - 1 == $scope.offsetPage + 1 && $scope.currentPage - 2 > 0) { // if prev page equals first page on grid, return grid && prevent prev page <= 0
            $scope.offsetPage--;
        }
        $scope.currentPage -= 1;
        console.log("$scope.currentPage " + $scope.currentPage)
        console.log("$scope.offsetPage " + $scope.offsetPage)
    };

    $scope.goToPage = function (page) {
        if (page == $scope.offsetPage + $scope.maxPage) {
            $scope.offsetPage++;
        } else if (page == $scope.offsetPage + 1 && page - 1 != 0) {
            $scope.offsetPage--;
        }         
        $scope.currentPage = page;
        console.log("$scope.currentPage " + $scope.currentPage)
        console.log("$scope.offsetPage " + $scope.offsetPage)
    };

    $scope.getNumber = function (num) {
        return new Array(num);
    };

    // Action Function

    $scope.$watch('currentPage', function (newVal, oldVal) {
        if (newVal !== oldVal) { // prevent running on start
            $scope.pageChangeFunc({ page: newVal });console.log(oldVal + " " + newVal)
        }
    });
});
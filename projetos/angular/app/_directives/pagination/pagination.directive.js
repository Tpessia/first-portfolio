app.directive('materializePag', function () {
    return {
        scope: {
            runOnInit: '=runOnInit',
            maxPage: '=maxPage',
            pageChangeFunc: '&pageChangeFunc'
        },
        controller: 'PaginationController',
        templateUrl: 'app/_directives/pagination/pagination.partial.html'
    };
});
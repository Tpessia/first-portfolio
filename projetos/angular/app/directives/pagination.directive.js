app.directive('materializePag', function () {
    return {
        scope: {
            runOnInit: '=runOnInit',
            maxPage: '=maxPage',
            pageChangeFunc: '&pageChangeFunc'
        },
        controller: 'PaginationController',
        templateUrl: 'app/directives/pagination.partial.html'
    };
});
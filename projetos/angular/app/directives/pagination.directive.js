app.directive('materializePag', function () {
    return {
        scope: {
            page: '=page',
            pages: '=pages'
        },
        templateUrl: 'app/directives/pagination.directive.html'
    };
});
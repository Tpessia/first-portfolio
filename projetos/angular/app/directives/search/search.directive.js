app.directive('searchWide', function () {
    return {
        scope: {
            searchFor: '=',
            onSearch: '&',
            onClose: '&'
        },
        controller: 'SearchController',
        templateUrl: 'app/directives/search/search.partial.html'
    };
});
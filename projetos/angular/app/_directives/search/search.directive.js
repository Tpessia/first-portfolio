app.directive('searchWide', function () {
    return {
        scope: {
            searchFor: '=',
            key: '=',
            onSearch: '&',
            onClose: '&'
        },
        controller: 'SearchController',
        templateUrl: 'app/_directives/search/search.partial.html'
    };
});
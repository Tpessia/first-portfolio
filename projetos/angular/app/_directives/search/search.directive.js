app.directive('searchWide', function () {
    return {
        scope: {
            searchFor: '=',
            key: '=',
            onSearch: '&',
            onClose: '&'
        },
        controller: 'SearchController',
        templateUrl: 'app/_directives/search/search.partial.html',
        link: function (scope, element, attr) {
            scope.instances = {
                autocomplete: M.Autocomplete.init($$('.autocomplete'), {
                    limit: 3,
                    onAutocomplete: function (key) {
                        scope.onSubmit(key);
                    }
                })
            };
        }
    };
});
app.directive('byCountry', function () {
    return {
        controller: 'ByCountryController',
        templateUrl: 'app/_directives/by-country/by-country.partial.html',
        link: function (scope, element, attrs) {
            scope.instances = {
                tabs: M.Tabs.init($$('.tabs'), {
                    swipeable: true
                })
            }
        }
    };
});
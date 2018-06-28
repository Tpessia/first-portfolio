app.directive('byCountry', function () {
    return {
        controller: 'ByCountryController',
        templateUrl: 'app/_directives/by-country/by-country.partial.html',
        link: function (scope, element, attrs, geoService) {
            var autoCountries = {};
            for (var i in scope.countries) {
                autoCountries[i] = null;
            }

            scope.instances = {
                tabs: M.Tabs.init($$('.tabs'), {
                    swipeable: true
                }),
                autocomplete: M.Autocomplete.init($$('.autocomplete'), {
                    data: autoCountries,
                    limit: 3,
                    onAutocomplete: function (country) {
                        element.triggerHandler('blur');

                        scope.currentCountry = country;

                        scope.getTracksByCountry(scope.currentCountry);
                        scope.getArtistsByCountry(scope.currentCountry);
                    }
                })
            }
        }
    };
});
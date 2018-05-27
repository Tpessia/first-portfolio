app.service("artistsService", function ($http, apiKeysService) {
    this.getArtistInfo = function (artist) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=' + apiKeysService.getKey() + '&format=json&artist=' + encodeURIComponent(artist), { cache: true });
    }

    this.getArtistSearch = function (artist, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=artist.search&api_key=' + apiKeysService.getKey() +'&format=json&artist=' + encodeURIComponent(artist) + '&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page), { cache: true });
    }
});
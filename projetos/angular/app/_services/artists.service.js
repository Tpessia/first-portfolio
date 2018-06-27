app.service("artistsService", function ($http, apiKeysService) {
    this.getArtistInfo = function (artist) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=' + apiKeysService.getLastFmKey() + '&format=json&artist=' + encodeURIComponent(artist));
    }

    this.getArtistSearch = function (artist, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=artist.search&api_key=' + apiKeysService.getLastFmKey() +'&format=json&artist=' + encodeURIComponent(artist) + '&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page));
    }

    this.getTopAlbums = function (artist, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=' + apiKeysService.getLastFmKey() +'&format=json&artist=' + encodeURIComponent(artist) + '&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page));
    }
});
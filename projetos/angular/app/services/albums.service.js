app.service("albumsService", function ($http, apiKeysService) {
    this.getAlbumInfo = function (artist, album) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + apiKeysService.getKey() + '&format=json&album=' + encodeURIComponent(album) + '&artist=' + encodeURIComponent(artist), { cache: true });
    }

    this.getAlbumSearch = function (album, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=album.search&api_key=' + apiKeysService.getKey() +'&format=json&album=' + encodeURIComponent(album) + '&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page), { cache: true });
    }
});
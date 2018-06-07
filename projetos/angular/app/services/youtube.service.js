app.service("youTubeService", function ($http, apiKeysService) {
    this.getMusicVideo = function (artist, track) {
        return $http.get('https://content.googleapis.com/youtube/v3/search?key=' + apiKeysService.getYouTubeKey() + '&part=id%2Csnippet&videoEmbeddable =true&maxResults=1&type=video&q=' + encodeURIComponent(artist + " - " + track), { cache: true });
    }

    this.getAlbumPlaylist = function (artist, album) {
        return $http.get('https://content.googleapis.com/youtube/v3/search?key=' + apiKeysService.getYouTubeKey() + '&part=id%2Csnippet&videoEmbeddable =true&maxResults=1&type=playlist&q=' + encodeURIComponent(artist + " - " + album), { cache: true });
    }

    this.getArtistPlaylist = function (artist) {
        return $http.get('https://content.googleapis.com/youtube/v3/search?key=' + apiKeysService.getYouTubeKey() + '&part=id%2Csnippet&videoEmbeddable =true&maxResults=1&type=playlist&q=' + encodeURIComponent(artist), { cache: true });
    }
});


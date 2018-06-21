app.service("topsService", function ($http, apiKeysService) {
    this.getTopTracks = function(page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + apiKeysService.getLastFmKey() + '&format=json&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page));
    }

    this.getTopArtists = function(page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKeysService.getLastFmKey() + '&format=json&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page), { cache: true });
    }

    this.getTopTags = function(page, limit) {
        // return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getLastFmKey() + '&format=json&limit=' + encodeURIComponent(limit) + '&page=' + encodeURIComponent(page), { cache: true });
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getLastFmKey() + '&format=json&limit=' + encodeURIComponent(page) * 5, { cache: true }); // API is broken for tags, always showing page 1 (top 5)
    }

    this.getTopArtistsByTag = function(tag, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=tag.gettopartists&api_key=' + apiKeysService.getLastFmKey() + '&format=json&limit=' + encodeURIComponent(limit) + '&tag=' + encodeURIComponent(tag) + '&page=' + encodeURIComponent(page), { cache: true });
    }
});
app.service("topsService", function ($http, apiKeysService) {
    this.getTopTracks = function(page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + limit + '&page=' + page);
    }

    this.getTopArtists = function(page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + limit + '&page=' + page);
    }

    this.getTopTags = function(page, limit) {
        // return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + limit + '&page=' + page);
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + page * 5); // API is broken for tags, always showing page 1 (top 5)
    }

    this.getTopArtistsByTag = function(tag, page, limit) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=tag.gettopartists&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + limit + '&tag=' + tag + '&page=' + page);
    }



    this.getTheTopTrack = function (page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + apiKeysService.getKey() + '&format=json&limit=1');
    }

    this.getTheTopArtist = function (page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKeysService.getKey() + '&format=json&limit=1');
    }

    this.getTheTopTag = function (page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getKey() + '&format=json&limit=1');
    }
});
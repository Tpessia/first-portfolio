app.service("topsService", function ($http, apiKeysService) {
    this.getTopTracks = function(page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=' + apiKeysService.getKey() + '&format=json&limit=5&page=' + page);
    }

    this.getTopArtists = function(page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKeysService.getKey() + '&format=json&limit=5&page=' + page);
    }

    this.getTopTags = function(page) {
        // return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getKey() + '&format=json&limit=5&page=' + page);
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=' + apiKeysService.getKey() + '&format=json&limit=' + page * 5); // API is broken for tags, always showing page 1 (top 5)
    }

    this.getTopArtistsByTag = function(tag, page) {
        if (typeof page === "undefined") {
            var page = 1;
        }
        return $http.get('//ws.audioscrobbler.com/2.0/?method=tag.gettopartists&api_key=' + apiKeysService.getKey() + '&format=json&limit=5&tag=' + tag + '&page=' + page);
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
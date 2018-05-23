app.service("topsService", function ($http) {
    this.getTopTracks = function(page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=a431af7680e5bd6e612b0eefd5448a06&format=json&limit=5&page=' + page);
    }

    this.getTopArtists = function(page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=a431af7680e5bd6e612b0eefd5448a06&format=json&limit=5&page=' + page);
    }

    this.getTopTags = function(page) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=a431af7680e5bd6e612b0eefd5448a06&format=json&limit=5&page=' + page);
    }
});
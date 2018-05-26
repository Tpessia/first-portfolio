app.service("tracksService", function($http) {
    this.getTrackInfo = function (artist, track) {
        return $http.get('//ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e443ac025fea43b249a36e29b0f12a91&format=json&artist=' + artist + '&track=' + track);
    }
});
app.service("artistsService", function () {
    var artists = ["Artist 1", "Artist 2"];

    this.getArtists = function () {
        return artists;
    };

    this.add = function (artist) {
        artists.push(artist);
    }
});
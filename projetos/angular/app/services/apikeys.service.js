app.service("apiKeysService", function () {
    var lastFmApiKeys = [
        'a431af7680e5bd6e612b0eefd5448a06',
        '61b502648995e8805c36d0996d41b879',
        'e443ac025fea43b249a36e29b0f12a91'
    ],
    youTubeApiKeys = [
        'AIzaSyA2-xI7nmoHKJKw1tFIWfONlGwqPx2B0MQ'
    ]

    this.getLastFmKey = function () {
        return lastFmApiKeys[Math.floor(Math.random() * lastFmApiKeys.length)];
    };

    this.getYouTubeKey = function() {
        return youTubeApiKeys[0];
    };
});
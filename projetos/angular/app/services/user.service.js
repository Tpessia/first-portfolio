app.service("userService", function ($rootScope) {
    this.user = {
        isLogged: false,
        username: 'johnsmith',
        name: 'John Smith',
        avatar: $rootScope.baseUrl + 'assets/img/yuna.jpg'
    };

    var savedPlaylistsObject = {
        'myPlaylist': ['VYOjWnS4cMY', '71Es-8FfATo']
    };

    this.savedPlaylists = {
        newPlaylist: function (playlistName) {
            if (!exist(savedPlaylistsObject[playlistName])) {
                savedPlaylistsObject[playlistName] = [];
                return true;
            }
            else {
                return false;
            }
        },
        deletePlaylist: function (playlistName) {
            if (exist(savedPlaylistsObject[playlistName])) {
                delete savedPlaylistsObject[playlistName];
                savedPlaylistsObject[playlistName] = [];
                return true;
            } else {
                return false;
            }
        },
        getPlaylist: function (playlistName) {
            if (exist(savedPlaylistsObject[playlistName])) {
                return savedPlaylistsObject[playlistName];
            } else {
                return false;
            }
        },
        addTrack: function (playlistName, trackId) {
            if (exist(savedPlaylistsObject[playlistName])) {
                savedPlaylistsObject[playlistName].push(trackId);
                return true;
            } else {
                return false;
            }
        },
        removeTrack: function (playlistName, index) {
            if (exist(savedPlaylistsObject[playlistName]) && index > -1) {
                savedPlaylistsObject[playlistName].splice(index, 1);
                return true;
            }
            else {
                return false
            }
        },
        appendPlaylist: function (playlistName, sourcePlaylist) {
            if (exist(savedPlaylistsObject[playlistName]) && exist(sourcePlaylist)) {
                for (var i in sourcePlaylist) {
                    this.addTrack(playlistName, sourcePlaylist[i]);
                }
                return true;
            }
            else {
                return false
            }
        }
    }

    function exist(data) {
        return typeof data !== 'undefined';
    }
});
app.service("userService", function ($rootScope) {
    this.user = {
        isLogged: true,
        avatar: $rootScope.baseUrl + 'assets/img/yuna.jpg',
        name: 'John Smith'
    };

    this.userSecure = {
        username: 'johnsmith',
        email: 'johnsmith@email.com',
        password: '12345678'
    }

    var savedPlaylistsObject = {
        'myPlaylist': [{
            id: 'VYOjWnS4cMY',
            title: 'Childish Gambino - This Is America (Official Video)',
            img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
        }, {
            id: '71Es-8FfATo',
            title: 'Arctic Monkeys - Four Out Of Five (Official Video)',
            img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
        }],
        'myPlaylist2': [{
            id: 'VYOjWnS4cMY',
            title: 'Childish Gambino - This Is America (Official Video)',
            img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
        }, {
            id: '71Es-8FfATo',
            title: 'Arctic Monkeys - Four Out Of Five (Official Video)',
            img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
        }],
        'myPlaylist3': []
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
        getAllPlaylists: function () {
            if (Object.keys(savedPlaylistsObject).length > 0) {
                return savedPlaylistsObject;
            } else {
                return false;
            }
        },
        addTrack: function (playlistName, trackData) {
            if (exist(savedPlaylistsObject[playlistName])) {
                savedPlaylistsObject[playlistName].push(trackData);
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
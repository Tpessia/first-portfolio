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

    var savedPlaylistsArray = [{
            name: 'myPlaylist1',
            date: new Date('2018-06-14T14:30:00'),
            list: [{
                id: 'VYOjWnS4cMY',
                title: 'Childish Gambino - This Is America (Official Video)',
                img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
            }, {
                id: '71Es-8FfATo',
                title: 'Arctic Monkeys - Four Out Of Five (Official Video)',
                img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
            }]
        }, {
            name: 'myPlaylist2',
            date: new Date('2018-06-14T14:30:00'),
            list: [{
                id: 'VYOjWnS4cMY',
                title: 'Childish Gambino - This Is America (Official Video)',
                img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
            }, {
                id: '71Es-8FfATo',
                title: 'Arctic Monkeys - Four Out Of Five (Official Video)',
                img: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
            }]
        }, {
            name: 'myPlaylist3',
            date: new Date('2018-06-14T14:00:00'),
            list: []
        }
    ];

    this.savedPlaylists = {
        newPlaylist: function (playlistName) {
            if (!playlistExists(playlistName)) {
                savedPlaylistsArray.push({
                    name: playlistName,
                    date: new Date(),
                    list: []
                });
                return true;
            }
            else {
                return false;
            }
        },
        deletePlaylist: function (playlistName) {
            if (playlistExists(playlistName)) {
                savedPlaylistsArray.splice(getIndex(playlistName), 1);
                return true;
            } else {
                return false;
            }
        },
        renamePlaylist: function (playlistName, newName) {
            if (playlistExists(playlistName) && !playlistExists(newName)) {
                savedPlaylistsArray[getIndex(playlistName)].name = newName;
                return true;
            } else {
                return false;
            }
        },
        getPlaylist: function (playlistName) {
            if (playlistExists(playlistName)) {
                return savedPlaylistsArray[getIndex(playlistName)];
            } else {
                return false;
            }
        },
        getAllPlaylists: function () {
            if (savedPlaylistsArray.length > 0) {
                return savedPlaylistsArray;
            } else {
                return false;
            }
        },
        addTrack: function (playlistName, trackData) {
            if (playlistExists(playlistName)) {
                savedPlaylistsArray[getIndex(playlistName)].list.push(trackData);
                return true;
            } else {
                return false;
            }
        },
        removeTrack: function (playlistName, index) {
            if (playlistExists(playlistName) && index > -1) {
                savedPlaylistsArray[getIndex(playlistName)].list.splice(index, 1);
                return true;
            }
            else {
                return false
            }
        },
        appendPlaylist: function (playlistName, sourcePlaylist) {
            if (playlistExists(playlistName) && typeof sourcePlaylist !== "undefined") {
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

    function getIndex(name) {
        var index = savedPlaylistsArray.findIndex(function(e) { return e.name == name });
        if (index >= 0) {
            return index;
        }
        return false;
    }

    function playlistExists(name) {
        if (savedPlaylistsArray.filter(function(e) { return e.name == name; }).length > 0) {
            return true;
        }
        return false;
    }
});
app.service("userService", function ($rootScope, $http) {
    
    // User

    this.user = {
        isLogged: false,
        avatar: $rootScope.baseUrl + 'assets/img/yuna.jpg',
        name: 'John Smith',
        email: 'johnsmith@email.com'
    };

    this.userSecure = {
        username: 'johnsmith',
        // password: '12345678'
    };

    this.signUp = function (data) {
        if (typeof data !== "undefined") {
            return $http.post($rootScope.baseUrl + 'src/user.signup.php', data);
        }
        else {
            return new Promise(
                function (resolve, reject) {
                    resolve({data:'0'});
                }
            );
        }
    };

    // Playlists

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
            date: new Date('2018-06-14T14:31:00'),
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
            date: new Date('2018-06-14T14:32:00'),
            list: []
        }
    ];

    this.savedPlaylists = {
        newPlaylist: function (playlistName) {
            if (!this.playlistExists(playlistName)) {
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
            if (this.playlistExists(playlistName)) {
                savedPlaylistsArray.splice(this.getIndex(playlistName), 1);
                return true;
            } else {
                return false;
            }
        },
        renamePlaylist: function (playlistName, newName) {
            if (this.playlistExists(playlistName) && !this.playlistExists(newName)) {
                savedPlaylistsArray[this.getIndex(playlistName)].name = newName;
                return true;
            } else {
                return false;
            }
        },
        getPlaylist: function (playlistName) {
            if (this.playlistExists(playlistName)) {
                return savedPlaylistsArray[this.getIndex(playlistName)];
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
            if (this.playlistExists(playlistName)) {
                savedPlaylistsArray[this.getIndex(playlistName)].list.push(trackData);
                return true;
            } else {
                return false;
            }
        },
        removeTrack: function (playlistName, index) {
            if (this.playlistExists(playlistName) && index > -1) {
                savedPlaylistsArray[this.getIndex(playlistName)].list.splice(index, 1);
                return true;
            }
            else {
                return false
            }
        },
        appendPlaylist: function (playlistName, sourcePlaylist) {
            if (this.playlistExists(playlistName) && typeof sourcePlaylist !== "undefined") {
                for (var i in sourcePlaylist) {
                    this.addTrack(playlistName, sourcePlaylist[i]);
                }
                return true;
            }
            else {
                return false
            }
        },
        // Helpers
        getIndex: function (name) {
            var index = savedPlaylistsArray.findIndex(function(e) { return e.name == name });
            if (index >= 0) {
                return index;
            }
            return false;
        },
        playlistExists: function (name) {
            if (savedPlaylistsArray.filter(function (e) {
                    return e.name == name;
                }).length > 0) {
                return true;
            }
            return false;
        }
    };
});
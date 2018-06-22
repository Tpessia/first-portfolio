CALL _create_tables();

CALL user_sign_up(
	'tpessia',
    'thiago@pessia.com',
    '123456',
    'Thiago Pessia',
    'public/users/avatars/_default-avatar.jpg',
    '2018-06-16 20:09:00'
);

CALL user_change_password(
	1,
    '123456',
    '654321'
);

CALL user_change_avatar(
	1,
    'public/users/avatars/1.jpg'
);

CALL user_sign_in(
	'tpessia',
    '654321'
);

SELECT *
FROM User;



CALL playlist_create(
	'Playlist 1',
    '2018-06-16 20:10:00',
    1
);

CALL playlist_rename(
	1,
    'Playlist 2',
    1
);

CALL playlist_get_all(
	1
);

CALL playlist_get(
	1,
    1
);

SELECT *
FROM Playlist;



CALL track_add(
	'Teste1',
    '123456',
    'my-image.jpg',
    '2018-06-17 01:31',
    1,
    1
);

CALL track_get_all(
	1
);

CALL track_get(
    1,
    1
);

CALL track_remove(
	1,
    1,
    1
);


CALL track_position(
	1,
    1,
    "down",
    1
);

UPDATE Track -- reset all postions
SET Position = TrackID;

SELECT *
FROM Track;

CALL playlist_delete(
	1
);



CALL user_delete(
	'tpessia',
    '123456',
    'thiago@pessia.com',
    1
);

DROP TABLE Track;
DROP TABLE Playlist;
DROP TABLE User;
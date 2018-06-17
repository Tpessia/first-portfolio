CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `playlist_delete`(
	IN inPlaylistID int,
    IN inUserID int
)
BEGIN
SELECT *
FROM Playlist as p
WHERE p.PlaylistID = inPlaylistID AND p.UserID = inUserID;

DELETE FROM Track
WHERE PlaylistID = inPlaylistID AND UserID = inUserID;

DELETE FROM Playlist
WHERE PlaylistID = inPlaylistID AND UserID = inUserID;
END
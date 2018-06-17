CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `playlist_get`(
    IN inPlaylistID int,
    IN inUserID int
)
BEGIN
SELECT *
FROM Playlist as p
WHERE p.PlaylistID = inPlaylistID AND p.UserID = inUserID;
END
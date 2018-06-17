CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `playlist_rename`(
	IN inPlaylistID int,
    IN inNewName VARCHAR(255),
    IN inUserID int
)
BEGIN
UPDATE Playlist
SET Name = inNewName
WHERE PlaylistID = inPlaylistID AND UserID = inUserID;

SELECT *
FROM Playlist as p
WHERE p.PlaylistID = inPlaylistID AND p.UserID = inUserID;
END
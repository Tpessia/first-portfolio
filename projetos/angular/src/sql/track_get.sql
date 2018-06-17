CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `track_get`(
	IN inPlaylistID int,
    IN inUserID int
)
BEGIN
SELECT *
FROM Track as t
WHERE t.PlaylistID = inPlaylistID AND t.UserID = inUserID;
END
CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `track_remove`(
	IN inTrackID int,
    IN inPlaylistID int,
    IN inUserID int
)
BEGIN
SELECT *
FROM Track as t
WHERE t.TrackID = inTrackID AND t.PlaylistID = inPlaylistID AND t.UserID = inUserID;

DELETE FROM Track
WHERE TrackID = inTrackID AND PlaylistID = inPlaylistID AND UserID = inUserID;
END
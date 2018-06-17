CREATE PROCEDURE `playlist_get_all` (
	IN inUserID int
)
BEGIN
SELECT *
FROM Playlist as p
WHERE p.UserID = inUserID;
END

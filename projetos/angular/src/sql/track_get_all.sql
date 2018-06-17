CREATE PROCEDURE `track_get_all` (
	IN inUserID int
)
BEGIN
SELECT *
FROM Track as t
WHERE t.UserID = inUserID;
END
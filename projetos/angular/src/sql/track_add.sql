CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `track_add`(
	IN inTitle VARCHAR(255),
    IN inVideo VARCHAR(255),
    IN inImage VARCHAR(255),
    IN inAdditionDate DATETIME,
    IN inPlaylistID int,
    IN inUserID int
)
BEGIN
INSERT INTO Track (Title, Video, Image, AdditionDate, PlaylistID, UserID)
VALUES (inTitle, inVideo, inImage, inAdditionDate, inPlaylistID, inUserID);

SET @track_id = LAST_INSERT_ID();

SELECT *
FROM Track as t
WHERE t.TrackID = @track_id AND t.PlaylistID = inPlaylistID;
END
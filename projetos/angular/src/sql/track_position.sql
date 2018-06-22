CREATE DEFINER=`u312806541_user1`@`189.8.93.10` PROCEDURE `track_position`(
	IN inTrackID int,
    IN inPlaylistID int,
    IN inDirection VARCHAR(255),
    IN inUserID int
)
BEGIN
SELECT *
FROM Track
WHERE TrackID = inTrackID AND PLaylistID = inPlaylistID;

SELECT @position := t.Position FROM Track as t WHERE t.TrackID = inTrackID;

UPDATE Track
SET Position = IF(inDirection = "up", Position + 1, Position - 1)
WHERE Position = IF(inDirection = "up", @position - 1, @position + 1) AND PLaylistID = inPlaylistID;

UPDATE Track
SET Position = IF(inDirection = "up", Position - 1, Position + 1)
WHERE TrackID = inTrackID AND PLaylistID = inPlaylistID;
END
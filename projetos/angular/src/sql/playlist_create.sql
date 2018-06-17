CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `playlist_create`(
	IN inName VARCHAR(255),
    IN inCreationDate DATETIME,
    IN inUserID int
)
BEGIN
INSERT INTO Playlist (Name, CreationDate, UserID)
VALUES (inName, inCreationDate, inUserID);

SELECT *
FROM Playlist as p
WHERE p.Name = inName AND p.UserID = inUserId;
END
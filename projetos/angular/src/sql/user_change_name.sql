CREATE PROCEDURE `user_change_name` (
	IN inUserID int,
    IN inName VARCHAR(255)
)
BEGIN
UPDATE User
SET Name = inName
WHERE UserID = inUserID;

SELECT u.UserID, u.Name
FROM User as u
WHERE u.UserID = inUserID AND u.Name = inName;
END

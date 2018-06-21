CREATE DEFINER=`u312806541_user1`@`189.8.93.10` PROCEDURE `user_change_avatar`(
	IN inUserID int,
    IN inAvatar VARCHAR(255)
)
BEGIN
UPDATE User
SET Avatar = inAvatar
WHERE UserID = inUserID;

SELECT u.UserID, u.Avatar
FROM User as u
WHERE u.UserID = inUserID;
END
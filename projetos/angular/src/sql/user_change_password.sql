CREATE DEFINER=`u312806541_user1`@`189.8.93.10` PROCEDURE `user_change_password`(
	IN inUserID int,
    IN inOldPassword int,
    IN inNewPassword int
)
BEGIN
UPDATE User
SET Password = inNewPassword
WHERE UserID = inUserID AND Password = inOldPassword;

SELECT u.UserID
FROM User as u
WHERE u.UserID = inUserID AND u.Password = inNewPassword;
END
CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `user_sign_in`(
	IN inUsername VARCHAR(255),
    IN inPassword VARCHAR(255)
)
BEGIN
SELECT *
FROM User as u
WHERE u.Username = inUsername AND u.Password = inPassword;
END
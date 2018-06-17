CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `user_sign_up`(
    IN inUsername VARCHAR(255),
    IN inEmail VARCHAR(255),
    IN inPassword VARCHAR(255),
	IN inName VARCHAR(255),
    IN inAvatar VARCHAR(255),
    IN inCreationDate DATETIME
)
BEGIN
INSERT INTO User (Username, Email, Password, Name, Avatar, CreationDate)
VALUES (inUsername, inEmail, inPassword, inName, inAvatar, inCreationDate);

SELECT *
FROM User as u
WHERE u.Username = inUsername AND u.Email = inEmail;
END
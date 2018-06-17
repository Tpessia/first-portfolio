CREATE PROCEDURE `user_delete` (
	IN inUsername VARCHAR(255),
    IN inPassword VARCHAR(255),
    IN inEmail VARCHAR(255)
)
BEGIN
SELECT *
FROM User as u
WHERE u.Username = inUsername AND u.Password = inPassword AND u.Email = inEmail;

DELETE FROM User
WHERE Username = inUsername AND Password = inPassword AND Email = inEmail;
END
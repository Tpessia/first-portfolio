CREATE DEFINER=`u312806541_user1`@`191.188.45.253` PROCEDURE `insert_user`(
    IN inUsername VARCHAR(255),
    IN inEmail VARCHAR(255),
    IN inPassword VARCHAR(255),
	IN inName VARCHAR(255),
    IN inCreationDate VARCHAR(255)
)
BEGIN
CREATE TABLE IF NOT EXISTS users (

    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    Username VARCHAR(255) NOT NULL,
    
    Email VARCHAR(255) NOT NULL,
    
    Password VARCHAR(255) NOT NULL,
    
    Name VARCHAR(255) NOT NULL,

    CreationDate DATETIME NOT NULL,
    
    UNIQUE (Username, Email)

);

INSERT INTO users (Username, Email, Password, Name, CreationDate)
VALUES (inUsername, inEmail, inPassword, inName, inCreationDate);
END
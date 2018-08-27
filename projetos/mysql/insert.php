<?php
    $servername = "mysql.hostinger.com.br";
    $username = "u643780299_user";
    $password = "0123456789";
    $dbname = "u643780299_db";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
        
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
        
    //insert
    $sql = "
    INSERT INTO users (user, password)
    VALUES ('".$_POST["username"]."', '".$_POST["password"]."')
    ";
        
    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
        
    //display
    $sql = "
    SELECT ID, user, password
    FROM users
    ";
    $result = mysqli_query($conn, $sql);
    
    $message = "";
    
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $message .= "ID: " . $row["ID"]. " | user: " . $row["user"]. " | password: " . $row["password"]. "<br>";
        }
        
        //echo json_encode($message);
        echo $message;
    } else {
        die("0 results");
    }
    
    //close
    mysqli_close($conn);
?>
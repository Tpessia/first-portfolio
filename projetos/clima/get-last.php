<?php
    $servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
    $dbname = "u643780299_clima";
    $username = "u643780299_admin";
    $password = "0123456789";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $sql = "

        SELECT date
        FROM sao_paulo as s
        ORDER BY s.date DESC
        LIMIT 1

    ";

    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            echo $row["date"];
        }
    } else {
        echo "1996-06-30";
    }
    
    mysqli_close($conn);
?>
<?php
    $servername = preg_match('/localhost/' ,$_SERVER["SERVER_NAME"]) ? "br-hdi-sql50.main-hosting.eu" : "mysql.hostinger.com.br";
    $dbname = "u312806541_clima";
    $username = "u312806541_admin";
    $password = "PoZvHuYgMtIp&314159";

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
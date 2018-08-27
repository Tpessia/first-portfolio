<html>
<head>
    <title>Meu PHP</title>
</head>
<body>
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
        echo "Connected successfully<br>";
        
        $sql = "
        TRUNCATE TABLE users
        ";
        
        if (mysqli_query($conn, $sql)) {
            echo "Truncated!";
        } else {
            echo "Error!";
        }
        
        mysqli_close($conn);
    ?>
</body>
</html>
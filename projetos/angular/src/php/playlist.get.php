<?php

if ($params = json_decode(file_get_contents('php://input'),true)) {
    // DB info

    $servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
    $username = "u643780299_user1";
    $password = "0123456789";
    $dbname = "u643780299_noise";

    // Create connection

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Check connection

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }



    // User info

    $params = json_decode(file_get_contents('php://input'),true);

    $playlist = mysqli_real_escape_string($conn, $params["playlist"]);
    $user = mysqli_real_escape_string($conn, $params["user"]);

    // Insert

    $sql = "

        CALL playlist_get('". $playlist ."','". $user ."');

    ";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo json_encode($row);
            }
        }
        else {
            die("Error: Query returned 0 results");
        }
    }
    else {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }



    // Close connection

    mysqli_close($conn);
}
else {
    die('Error: ' . 'Invalid parameters');
}

?>
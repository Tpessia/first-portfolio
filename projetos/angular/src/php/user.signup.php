<?php

date_default_timezone_set('America/Sao_Paulo');

// DB info

$servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
$username = "u312806541_user1";
$password = "dInPbOsAaNcJ!314159";
$dbname = "u312806541_noise";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}



// User info

$params = json_decode(file_get_contents('php://input'),true);

$username = mysqli_real_escape_string($conn, $params["username"]);
$email = mysqli_real_escape_string($conn, $params["email"]);
$password = mysqli_real_escape_string($conn, $params["password"]);
$name = mysqli_real_escape_string($conn, $params["username"]);
$avatar = "public/users/avatars/_default-avatar.jpg";
$date = date('Y-m-d H-i-s');

// Insert

$sql = "

    CALL user_sign_up('". $username ."','". $email ."','". $password ."','". $name ."','". $avatar ."','". $date ."');

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

?>
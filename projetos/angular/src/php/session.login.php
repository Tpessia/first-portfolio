<?php

session_start();

if (isset($_SESSION["username"]) && isset($_SESSION["password"])) {
    echo json_encode(array(
        'username' => $_SESSION["username"],
        'password' => $_SESSION["password"]
    ));
}
else {
    die("Error: Session not found. " + var_dump($_SESSION));
}

?>
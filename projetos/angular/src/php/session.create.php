<?php

session_start();

$params = json_decode(file_get_contents('php://input'),true);

$username = $params["username"];
$password = $params["password"];

$_SESSION["username"] = $username;
$_SESSION["password"] = $password;

?>
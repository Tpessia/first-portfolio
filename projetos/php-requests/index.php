<?php
    $testePost = $_POST["testePost"];
    $testeGet = $_GET["testeGet"];

    if (isset($testePost)) {
        echo "Post:" . $testePost;
    }
    else if (isset($testeGet)) {
        echo "Get:" . $testeGet;
    }
?>
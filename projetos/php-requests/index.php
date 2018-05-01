<?php
    if (isset($_POST)) {
        echo "Post: ";
        var_dump($_POST);
    }
    else if (isset($_GET)) {
        echo "Get:";
        var_dump($_GET);
    }
?>
<?php
if (isset($_FILES["avatar"]) && isset($_POST["userId"])) {
    $target_dir = "../../public/users/avatars/";
    $target_file = $target_dir . $_POST["userId"] . "." . pathinfo($_FILES["avatar"]["name"], PATHINFO_EXTENSION);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["avatar"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = "Not an image";
    }

    // Check file size
    if ($_FILES["avatar"]["size"] > 1000000) { // 1 MB
        $uploadOk = "Image too large";
    }

    // Check if $uploadOk is Ok (1) or error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["avatar"]["tmp_name"], $target_file)) {
            echo "1";
        } else {
            echo "Sorry, there was an error uploading your file. " . $uploadOk . ".";
        }
    } else {
        echo "Sorry, your file was not uploaded."  . $uploadOk . ".";
    }
}
else {
    echo "Expected file \"avatar\" or user data \"ID\" not received.";
}
?>
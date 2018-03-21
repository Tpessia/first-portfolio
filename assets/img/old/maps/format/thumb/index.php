<?php
foreach (scandir('.') as $file)
    if($file!="." && $file!=".." && $file!="index.php") {
        echo "<p>" . $file . "</p>";
    }
?>
<?php
    $myfile = fopen("bin.txt", "w") or die("Unable to open file!");
      
    $txt = $_POST["bin"];

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);
?>
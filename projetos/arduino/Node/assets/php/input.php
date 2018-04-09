<?php
    $myfile = fopen("input.bin", "w") or die("Unable to open file!");
      
    $txt = $_POST["input"];

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);
?>

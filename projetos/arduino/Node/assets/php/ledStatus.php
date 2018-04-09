<?php
    $myfile = fopen("ledStatus.bin", "w") or die("Unable to open file!");
      
    $txt = $_GET["output"]; //valor retornado pelo servidor

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);
?>

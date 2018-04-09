<?php
    $myfile = fopen("portao.bin", "w") or die("Unable to open file!");
      
    $txt = 1;

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);

    sleep(1.5);

    $myfile = fopen("portao.bin", "w") or die("Unable to open file!");
      
    $txt = 0;

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);
?>
<?php
    //date_default_timezone_set("America/Sao_Paulo");

    $myfile = fopen("serverStatus.txt", "w") or die("Unable to open file!");
    
    $time_stamp = time() * 1000; //quem vai me dar esse valor é o servidor

    $txt = $time_stamp;

    echo $txt;
      
    fwrite($myfile, $txt);
      
    fclose($myfile);
?>

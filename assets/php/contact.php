<?php
    #error_reporting(-1);
    #ini_set('display_errors', 'On');
    #set_error_handler("var_dump");

    date_default_timezone_set('America/Sao_Paulo');

    mb_internal_encoding('UTF-8');

    $date = date('d/m/Y H:i:s');    
    $dest = "thiago@pessia.xyz";
    $subject = $_POST["assunto"];
    $e_subject = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n", strlen('Subject: '));
    $from = $_POST["email"];
    $name = $_POST["nome"];
    $message = $_POST["mensagem"];

    $txt = $message . "<br><p>" . $name . "<br>" . $date . "</p>";
    $headers = "From: " . $from . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $status = mail($dest,$e_subject,$txt,$headers);

    if($status) { 
        echo '1';
    }
    else { 
        echo '0'; 
    }
    
    #echo "<p>" . $date . " " . $_POST["nome"] . " " . $_POST["mensagem"] . " " . $_POST["assunto"] . " " . $_POST["email"] . "</p>";
?>

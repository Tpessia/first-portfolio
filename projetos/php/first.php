<html>
<head>
  <title>Meu PHP</title>
</head>
<body>
  Bem vindo <?php echo $_POST["nome"]; ?>
  <br>
  Seu email é: <?php echo $_POST["email"]; ?>
  <br>
  <?php
    if ($_POST["botao"] == "Ajax") {
      $myfile = fopen("testfile.txt", "w") or die("Unable to open file!");
      
      $txt = "Bem vindo" . $_POST["nome"] . "\nSeu email é: " . $_POST["email"];

      echo $txt;
      
      fwrite($myfile, $txt);
      
      fclose($myfile);
    }
    elseif ($_POST["botao"] == "Send Email") {
      $subject = "My subject";
      $txt = "Olá  " . $_POST["nome"] . "!";
      $headers = "From: teste@pessia.xyz";

      mail($_POST["email"],$subject,$txt,$headers);
    }
  ?>
</body>
</html>
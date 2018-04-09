<html>
  <head>
    <title>Localização</title>
    <link rel="icon" type="image/png" href="https://www.shareicon.net/data/128x128/2016/05/20/768156_gps_512x512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <?php
      $file = "localizacao.txt";
      echo file_get_contents($file);
      #$myfile = fopen($file, "r");
      #fread($myfile, file_size($file));
      #fclose($myfile);
    ?>
  </body>
  <style>
    body {
      font-size: 4.5vw;
    }
  </style>
</html>

<?php
#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);

$xml = file_get_contents("http://www.websro.com.br/correios.php?P_COD_UNI=" . $_GET["id"]);

preg_match("/[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s[0-9]{2}\:[0-9]{2}/", $xml, $date);

$status = preg_split("/[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s[0-9]{2}\:[0-9]{2}/", $xml);

$status = preg_split("/<\/strong><\/td>/", $status[1]);

$temp = $status[1];

$status = preg_split("/<strong>/", $status[0]);

$place = preg_split("/<\/td>/", $temp);

$place = preg_split("/Local\:\s/", $place[0]);

echo "{ ";

echo "\"date\": \"" . $date[0] . "\", ";

echo "\"status\": \"" . $status[1] . "\", ";

echo "\"place\": \"" . $place[1] . "\"";

echo " }";
?>
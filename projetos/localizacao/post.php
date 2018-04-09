<?php
date_default_timezone_set('America/Sao_Paulo');
$date = date('m/d/Y h:i:s a', time());
$file = "localizacao.txt";
$data = file($file); // reads an array of lines
function replace_a_line($data) {
   $localizacao = $_GET["localizacao"];
   echo $data . " " . $localizacao . " Stristr1 " . stristr($data, $localizacao) . " IsStr " . (strpos($data, $localizacao) !== strpos("aaa","b")) . "<br>";
   #if (stristr($data, $localizacao)) {
   if (strpos($data, $localizacao) !== strpos("aaa","b")) {
     $date = date('m/d/Y h:i:s a', time());
     $returnStr = $localizacao . " " . $date . "\n";
     echo "OOOOOOOOOOO" . $returnStr;
     return $returnStr;
   }
   return $data;
}
#$data = array_map('replace_a_line',$data);
#file_put_contents($file, implode('', $data));
$result = $_GET["localizacao"] . " " . $date;
file_put_contents($file, $result);
echo $result;
?>

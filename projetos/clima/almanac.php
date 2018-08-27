<?php

$json = file_get_contents("http://api.wunderground.com/api/863a1b76beeb23bd/almanac/q/zmw:00000.100.83779.json");
$data = json_decode($json, true);

$today = new DateTime();
$temp_high_record_year = new DateTime($data["almanac"]["temp_high"]["recordyear"] . $today->format("md"));
$temp_low_record_year = new DateTime($data["almanac"]["temp_low"]["recordyear"] . $today->format("md"));


$servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
$dbname = "u643780299_clima";
$username = "u643780299_admin";
$password = "PoZvHuYgMtIp&314159";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
    
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "

CREATE TABLE IF NOT EXISTS almanac (

    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

    mon_day SMALLINT NOT NULL,

    date DATE NOT NULL,

    temp_high_normal_i FLOAT,

    temp_high_normal_m FLOAT,

    temp_high_record_i FLOAT,

    temp_high_record_m FLOAT,

    temp_high_record_year DATE,

    temp_low_normal_i FLOAT,

    temp_low_normal_m FLOAT,

    temp_low_record_i FLOAT,

    temp_low_record_m FLOAT,

    temp_low_record_year DATE,

    UNIQUE (mon_day)

);

";

if (!mysqli_query($conn, $sql)) {
    die("Error: " . $sql . "<br>" . mysqli_error($conn));
}

//insert

$sql = "

    REPLACE INTO almanac (mon_day, date, temp_high_normal_i, temp_high_normal_m, temp_high_record_i, temp_high_record_m, temp_high_record_year, temp_low_normal_i, temp_low_normal_m, temp_low_record_i, temp_low_record_m, temp_low_record_year)
    VALUES (".$today->format('md').",'".$today->format('Y-m-d')."','".$data["almanac"]["temp_high"]["normal"]["F"]."','".$data["almanac"]["temp_high"]["normal"]["C"]."','".$data["almanac"]["temp_high"]["record"]["F"]."','".$data["almanac"]["temp_high"]["record"]["C"]."','".$temp_high_record_year->format("Y-m-d")."','".$data["almanac"]["temp_low"]["normal"]["F"]."','".$data["almanac"]["temp_low"]["normal"]["C"]."','".$data["almanac"]["temp_low"]["record"]["F"]."','".$data["almanac"]["temp_low"]["record"]["C"]."','".$temp_low_record_year->format("Y-m-d")."')

";        

if (!mysqli_query($conn, $sql)) {
    die("Error: " . $sql . "<br>" . mysqli_error($conn));
}

echo var_dump($data) . "\n\n";

//close

mysqli_close($conn);

?>
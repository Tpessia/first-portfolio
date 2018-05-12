<?php
    $servername = "mysql.hostinger.com.br";
    $dbname = "u330258262_clima";
    $username = "u330258262_admin";
    $password = "PoZvHuYgMtIp&314159";
    
    // SELECT maxtempm, meantempm, mintempm FROM `sao_paulo_summary` WHERE date BETWEEN "1996-06-30" AND "1996-07-30"

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "
    
        SELECT s.date, s.maxtempm, s.meantempm, s.mintempm
        FROM `sao_paulo_summary` as s
        WHERE date BETWEEN '" . $_GET["min"] . "' AND '" . $_GET["max"] . "'

    ";

    $sql_data = mysqli_query($conn, $sql);

    $output = '{';

    if (mysqli_num_rows($sql_data) > 0) {

        while($row = mysqli_fetch_assoc($sql_data)) {

            $first = true;

            foreach ($row as $key => $value) {
                if ($first) {
                    $first = false;
                    $output .= '"' . $value . '":{';
                }
                else {
                    $output .= '"' . $key . '":"' . $value . '",';
                }
            }

            $output = trim($output, ",");

            $output .= '},';

        }
        
    }

    $output = trim($output, ",");

    $output .= '}';

    echo $output;
    
    mysqli_close($conn);
?>
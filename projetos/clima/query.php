<?php
    $servername = "mysql.hostinger.com.br";
    $dbname = "u330258262_clima";
    $username = "u330258262_admin";
    $password = "PoZvHuYgMtIp&314159";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }


    $output = '{';

    
    // SUMMARY

    $sql = "

        SELECT *
        FROM `sao_paulo_summary`
        WHERE sao_paulo_summary.date = '" . $_GET["date"] . "'
        LIMIT 1

    ";

    $summary = mysqli_query($conn, $sql);
        
    $output .= '"summary":' . '{';

    if (mysqli_num_rows($summary) > 0) {

        while($row = mysqli_fetch_assoc($summary)) {

            foreach ($row as $key => $value) {
                $output .= '"' . $key . '":' . '"' . $value . '",';
            }

            $output = trim($output,',');

        }

        // $output -> {"summary":{"a":"1"}}
    }

    $output .= '},';


    // HOURLY    
    
    $sql = "

        SELECT *
        FROM `sao_paulo`
        WHERE sao_paulo.date = '" . $_GET["date"] . "'

    ";

    $hourly = mysqli_query($conn, $sql);

    $output .= '"hourly":' . '[';
    
    if (mysqli_num_rows($hourly) > 0) {

        while($row = mysqli_fetch_assoc($hourly)) {
            $output .= '{';

            foreach ($row as $key => $value) {
                $output .= '"' . $key . '":' . '"' . $value . '",';
            }

            $output = trim($output,',');

            $output .= '},';
        }

        $output = trim($output,',');

        // $output = {"hourly": [{"a":1}]}

    }

    $output .= '],';


    // ALMANAC

    $sql = "

        SELECT *
        FROM `almanac`
        WHERE almanac.mon_day = " . substr($_GET["date"], -4) . "
        LIMIT 1

    ";

    $summary = mysqli_query($conn, $sql);
        
    $output .= '"almanac":' . '{';

    if (mysqli_num_rows($summary) > 0) {

        while($row = mysqli_fetch_assoc($summary)) {

            foreach ($row as $key => $value) {
                $output .= '"' . $key . '":' . '"' . $value . '",';
            }

            $output = trim($output,',');

        }

        // $output -> {"almanac":{"a":"1"}}
    }

    $output .= '},';

    
    $output = trim($output,',');
    $output .= "}";

    echo $output;
    
    mysqli_close($conn);
?>
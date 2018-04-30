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
    
    $sql = "

        SELECT *
        FROM `sao_paulo`
        WHERE sao_paulo.date = '" . $_GET["date"] . "'

    ";

    $hourly = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($hourly) > 0) {

        $output = '[';

        // output data of each row
        while($row = mysqli_fetch_assoc($hourly)) {
            $output .= '{';

            foreach ($row as $key => $value) {
                $output .= '"' . $key . '": ' . '"' . $value . '",';
            }

            $output = trim($output,',');

            $output .= '},';
        }

        $sql = "

            SELECT *
            FROM `sao_paulo`
            WHERE sao_paulo.date = '" . $_GET["date"] . "'

        ";

        $summary = mysqli_query($conn, $sql);

        if (mysqli_num_rows($summary) > 0) {
            while($row = mysqli_fetch_assoc($summary)) {
                $output .= '{';

                foreach ($row as $key => $value) {
                    $output .= '"' . $key . '": ' . '"' . $value . '",';
                }

                $output = trim($output,',');

                $output .= '},';
            }
        }

        $output = trim($output,',');

        $output .= ']';

        echo $output;
    } else {
        echo "0";
    }
    
    mysqli_close($conn);
?>
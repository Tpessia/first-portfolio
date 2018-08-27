<?php
    if (!isset($_GET["select"])) {
        die("Insira o parâmetro \"select\" na URL para fazer uma pesquisa.");
    }
    else if (!isset($_GET["min"]) && !isset($_GET["max"])) {
        die("Insira o parâmetro \"min\" e/ou \"max\" na URL para fazer uma pesquisa.");
    }
    else if (!isset($_GET["min"])) {
        $_GET["min"] = "1996-06-30";
    }
    else if (!isset($_GET["max"])) {
        $_GET["max"] = date('Y-m-d');
    }

    switch ($_GET["select"]) {
        case "temp":
            $select = "s.date,s.maxtempm,s.meantempm,s.mintempm";
            break;
        case "dewpt":
            $select = "s.date,s.maxdewptm,s.meandewptm,s.mindewptm";
            break;
        case "vis":
            $select = "s.date,s.maxvism,s.meanvism,s.minvism";
            break;
        case "pressure":
            $select = "s.date,s.maxpressurem,s.meanpressurem,s.minpressurem";
            break;
        case "wspd":
            $select = "s.date,s.maxwspdm,s.meanwindspdm,s.minwspdm";
            break;
        case "wdird":
            $select = "s.date,s.meanwdird";
            break;
        case "humity":
            $select = "s.date,s.maxhumidity,s.humidity,s.minhumidity";
            break;
        case "precip":
            $select = "s.date,s.precipm";
            break;
        case "state":
            $select = "s.date,s.fog,s.hail,s.rain,s.snow,s.thunder";
            break;
        default:
            die("Valor de \"select\" é inválido!");
            break;
    }

    $servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
    $dbname = "u643780299_clima";
    $username = "u643780299_admin";
    $password = "PoZvHuYgMtIp&314159";
    
    // SELECT maxtempm, meantempm, mintempm FROM `sao_paulo_summary` WHERE date BETWEEN "1996-06-30" AND "1996-07-30"

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "
    
        SELECT " . $select . "
        FROM sao_paulo_summary as s
        WHERE s.date BETWEEN '" . $_GET["min"] . "' AND '" . $_GET["max"] . "'
        ORDER BY s.date

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
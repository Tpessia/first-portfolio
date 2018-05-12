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
            $select = "maxtempm,meantempm,mintempm";
            break;
        case "dewpt":
            $select = "maxdewptm,meandewptm,mindewptm";
            break;
        case "vis":
            $select = "maxvism,meanvism,minvism";
            break;
        case "pressure":
            $select = "maxpressurem,meanpressurem,minpressurem";
            break;
        case "wspd":
            $select = "maxwspdm,meanwindspdm,minwspdm";
            break;
        case "wdird":
            $select = "meanwdird";
            break;
        case "wdire":
            $select = "meanwdire";
            break;
        case "humity":
            $select = "maxhumidity,humidity,minhumidity";
            break;
        case "precip":
            $select = "precipm";
            break;
        case "state":
            $select = "fog,hail,rain,snow,thunder";
            break;
        default:
            die("Valor de \"select\" é inválido!");
            break;
    }

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
    
        SELECT " . $select . "
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
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

    CREATE TABLE IF NOT EXISTS sao_paulo (

        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

        date DATE NOT NULL,

        datetime DATETIME NOT NULL,

        conds VARCHAR(255),

        dewpti FLOAT,

        dewptm FLOAT,

        fog BIT,

        hail BIT,

        heatindexi FLOAT,

        heatindexm FLOAT,

        hum FLOAT,

        icon VARCHAR(255),

        metar VARCHAR(255),

        precipi FLOAT,

        precipm FLOAT,

        pressurei FLOAT,

        pressurem FLOAT,

        rain BIT,

        snow BIT,

        tempi FLOAT,

        tempm FLOAT,

        thunder BIT,

        tornado BIT,

        visi FLOAT,

        vism FLOAT,

        wdird FLOAT,

        wdire VARCHAR(255),

        wgusti FLOAT,

        wgustm FLOAT,

        windchilli FLOAT,

        windchillm FLOAT,

        wspdi FLOAT,

        wspdm FLOAT

    );

    ";

    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
        
    //insert

    echo var_dump($_POST["json"]) . "\n\n\n\n\n\n";

    foreach ($_POST["json"] as $json) {

        $sql = "

            INSERT INTO sao_paulo (date, datetime, conds, dewpti, dewptm, fog, hail, heatindexi, heatindexm, hum, icon, metar, precipi, precipm, pressurei, pressurem, rain, snow, tempi, tempm, thunder, tornado, visi, vism, wdird, wdire, wgusti, wgustm, windchilli, windchillm, wspdi, wspdm)
            VALUES ('".$json["date"]."','".$json["datetime"]."','".$json["conds"]."','".$json["dewpti"]."','".$json["dewptm"]."','".$json["fog"]."','".$json["hail"]."','".$json["heatindexi"]."','".$json["heatindexm"]."','".$json["hum"]."','".$json["icon"]."','".$json["metar"]."','".$json["precipi"]."','".$json["precipm"]."','".$json["pressurei"]."','".$json["pressurem"]."','".$json["rain"]."','".$json["snow"]."','".$json["tempi"]."','".$json["tempm"]."','".$json["thunder"]."','".$json["tornado"]."','".$json["visi"]."','".$json["vism"]."','".$json["wdird"]."','".$json["wdire"]."','".$json["wgusti"]."','".$json["wgustm"]."','".$json["windchilli"]."','".$json["windchillm"]."','".$json["wspdi"]."','".$json["wspdm"]."')

        ";

        echo var_dump($json) . "\n\n";

    }
        
    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
    
    //close
    mysqli_close($conn);
?>
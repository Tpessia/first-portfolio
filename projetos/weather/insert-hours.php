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

        icon VARCHAR(255),

        tempi FLOAT,

        tempm FLOAT,

        heatindexi FLOAT,

        heatindexm FLOAT,

        dewpti FLOAT,

        dewptm FLOAT,

        precipi FLOAT,

        precipm FLOAT,

        pressurei FLOAT,

        pressurem FLOAT,

        visi FLOAT,

        vism FLOAT,

        hum FLOAT,

        fog BIT,

        rain BIT,

        thunder BIT,

        hail BIT,

        snow BIT,

        tornado BIT,

        wdird FLOAT,

        wdire VARCHAR(255),

        wspdi FLOAT,

        wspdm FLOAT,

        wgusti FLOAT,

        wgustm FLOAT,

        windchilli FLOAT,

        windchillm FLOAT,

        metar VARCHAR(255),

        UNIQUE (datetime)

    );

    ";

    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
        
    //insert

    if (!isset($_POST["null_date"]) && !isset($_POST["null_datetime"])) {

        foreach ($_POST as $json) {

            $sql = "

                INSERT INTO sao_paulo (date, datetime, conds, icon, tempi, tempm, heatindexi, heatindexm, dewpti, dewptm, precipi, precipm, pressurei, pressurem, visi, vism, hum, fog, rain, thunder, hail, snow, tornado, wdird, wdire, wspdi, wspdm, wgusti, wgustm, windchilli, windchillm, metar)
                VALUES ('".$json["date"]."','".$json["datetime"]."','".$json["conds"]."','".$json["icon"]."','".$json["tempi"]."','".$json["tempm"]."','".$json["heatindexi"]."','".$json["heatindexm"]."','".$json["dewpti"]."','".$json["dewptm"]."','".$json["precipi"]."','".$json["precipm"]."','".$json["pressurei"]."','".$json["pressurem"]."','".$json["visi"]."','".$json["vism"]."','".$json["hum"]."',".$json["fog"].",".$json["rain"].",".$json["thunder"].",".$json["hail"].",".$json["snow"].",".$json["tornado"].",'".$json["wdird"]."','".$json["wdire"]."','".$json["wspdi"]."','".$json["wspdm"]."','".$json["wgusti"]."','".$json["wgustm"]."','".$json["windchilli"]."','".$json["windchillm"]."','".$json["metar"]."')
                ON DUPLICATE KEY UPDATE conds=VALUES(conds),icon=VALUES(icon),tempi=VALUES(tempi),tempm=VALUES(tempm),heatindexi=VALUES(heatindexi),heatindexm=VALUES(heatindexm),dewpti=VALUES(dewpti),dewptm=VALUES(dewptm),precipi=VALUES(precipi),precipm=VALUES(precipm),pressurei=VALUES(pressurei),pressurem=VALUES(pressurem),visi=VALUES(visi),vism=VALUES(vism),hum=VALUES(hum),fog=VALUES(fog),rain=VALUES(rain),thunder=VALUES(thunder),hail=VALUES(hail),snow=VALUES(snow),tornado=VALUES(tornado),wdird=VALUES(wdird),wdire=VALUES(wdire),wspdi=VALUES(wspdi),wspdm=VALUES(wspdm),wgusti=VALUES(wgusti),wgustm=VALUES(wgustm),windchilli=VALUES(windchilli),windchillm=VALUES(windchillm),metar=VALUES(metar)

            ";
            
            if (!mysqli_query($conn, $sql)) {
                die("Error: " . $sql . "<br>" . mysqli_error($conn));
            }

            // echo var_dump($json) . "\n\n";

        }

    }
    else {

        $sql = "

            INSERT INTO sao_paulo (date, datetime)
            VALUES ('".$json["null"]["date"]."','".$json["null"]["datetime"]."')
            ON DUPLICATE KEY UPDATE date=date, datetime=datetime

        ";
        
        if (!mysqli_query($conn, $sql)) {
            die("Error: " . $sql . "<br>" . mysqli_error($conn));
        }

    }
    
    //close
    mysqli_close($conn);
?>
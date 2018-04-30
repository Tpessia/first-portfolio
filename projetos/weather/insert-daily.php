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

    CREATE TABLE IF NOT EXISTS sao_paulo_summary (

        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

        date DATE NOT NULL,

        coolingdegreedays FLOAT,

        coolingdegreedaysnormal FLOAT,

        fog BIT,

        gdegreedays FLOAT,

        hail BIT,

        heatingdegreedays FLOAT,

        heatingdegreedaysnormal FLOAT,

        humidity FLOAT,

        maxdewpti FLOAT,

        maxdewptm FLOAT,

        maxhumidity FLOAT,

        maxpressurei FLOAT,

        maxpressurem FLOAT,

        maxtempi FLOAT,

        maxtempm FLOAT,

        maxvisi FLOAT,

        maxvism FLOAT,

        maxwspdi FLOAT,

        maxwspdm FLOAT,

        meandewpti FLOAT,

        meandewptm FLOAT,

        meanpressurei FLOAT,

        meanpressurem FLOAT,

        meantempi FLOAT,

        meantempm FLOAT,

        meanvisi FLOAT,

        meanvism FLOAT,

        meanwdird FLOAT,

        meanwdire VARCHAR(255),

        meanwindspdi FLOAT,

        meanwindspdm FLOAT,

        mindewpti FLOAT,

        mindewptm FLOAT,

        minhumidity FLOAT,

        minpressurei FLOAT,

        minpressurem FLOAT,

        mintempi FLOAT,

        mintempm FLOAT,

        minvisi FLOAT,

        minvism FLOAT,

        minwspdi FLOAT,

        minwspdm FLOAT,

        monthtodatecoolingdegreedays VARCHAR(255),

        monthtodatecoolingdegreedaysnormal VARCHAR(255),

        monthtodateheatingdegreedays VARCHAR(255),

        monthtodateheatingdegreedaysnormal VARCHAR(255),

        monthtodatesnowfalli VARCHAR(255),

        monthtodatesnowfallm VARCHAR(255),

        precipi FLOAT,

        precipm FLOAT,

        precipsource VARCHAR(255),

        rain BIT,

        since1jancoolingdegreedays VARCHAR(255),

        since1jancoolingdegreedaysnormal VARCHAR(255),

        since1julheatingdegreedays VARCHAR(255),

        since1julheatingdegreedaysnormal VARCHAR(255),

        since1julsnowfalli VARCHAR(255),

        since1julsnowfallm VARCHAR(255),

        since1sepcoolingdegreedays VARCHAR(255),

        since1sepcoolingdegreedaysnormal VARCHAR(255),

        since1sepheatingdegreedays VARCHAR(255),

        since1sepheatingdegreedaysnormal VARCHAR(255),

        snow BIT,

        snowdepthi VARCHAR(255),

        snowdepthm VARCHAR(255),

        snowfalli VARCHAR(255),

        snowfallm VARCHAR(255),

        thunder BIT,

        tornado BIT

    );

    ";

    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
        
    //insert

    foreach ($_POST as $json) {

        $sql = "

            INSERT INTO sao_paulo_summary (date, coolingdegreedays, coolingdegreedaysnormal, fog, gdegreedays, hail, heatingdegreedays, heatingdegreedaysnormal, humidity, maxdewpti, maxdewptm, maxhumidity, maxpressurei, maxpressurem, maxtempi, maxtempm, maxvisi, maxvism, maxwspdi, maxwspdm, meandewpti, meandewptm, meanpressurei, meanpressurem, meantempi, meantempm, meanvisi, meanvism, meanwdird, meanwdire, meanwindspdi, meanwindspdm, mindewpti, mindewptm, minhumidity, minpressurei, minpressurem, mintempi, mintempm, minvisi, minvism, minwspdi, minwspdm, monthtodatecoolingdegreedays, monthtodatecoolingdegreedaysnormal, monthtodateheatingdegreedays, monthtodateheatingdegreedaysnormal, monthtodatesnowfalli, monthtodatesnowfallm, precipi, precipm, precipsource, rain, since1jancoolingdegreedays, since1jancoolingdegreedaysnormal, since1julheatingdegreedays, since1julheatingdegreedaysnormal, since1julsnowfalli, since1julsnowfallm, since1sepcoolingdegreedays, since1sepcoolingdegreedaysnormal, since1sepheatingdegreedays, since1sepheatingdegreedaysnormal, snow, snowdepthi, snowdepthm, snowfalli, snowfallm, thunder, tornado)
            VALUES ('".$json["date"]."','".$json["coolingdegreedays"]."','".$json["coolingdegreedaysnormal"]."',".$json["fog"].",'".$json["gdegreedays"]."',".$json["hail"].",'".$json["heatingdegreedays"]."','".$json["heatingdegreedaysnormal"]."','".$json["humidity"]."','".$json["maxdewpti"]."','".$json["maxdewptm"]."','".$json["maxhumidity"]."','".$json["maxpressurei"]."','".$json["maxpressurem"]."','".$json["maxtempi"]."','".$json["maxtempm"]."','".$json["maxvisi"]."','".$json["maxvism"]."','".$json["maxwspdi"]."','".$json["maxwspdm"]."','".$json["meandewpti"]."','".$json["meandewptm"]."','".$json["meanpressurei"]."','".$json["meanpressurem"]."','".$json["meantempi"]."','".$json["meantempm"]."','".$json["meanvisi"]."','".$json["meanvism"]."','".$json["meanwdird"]."','".$json["meanwdire"]."','".$json["meanwindspdi"]."','".$json["meanwindspdm"]."','".$json["mindewpti"]."','".$json["mindewptm"]."','".$json["minhumidity"]."','".$json["minpressurei"]."','".$json["minpressurem"]."','".$json["mintempi"]."','".$json["mintempm"]."','".$json["minvisi"]."','".$json["minvism"]."','".$json["minwspdi"]."','".$json["minwspdm"]."','".$json["monthtodatecoolingdegreedays"]."','".$json["monthtodatecoolingdegreedaysnormal"]."','".$json["monthtodateheatingdegreedays"]."','".$json["monthtodateheatingdegreedaysnormal"]."','".$json["monthtodatesnowfalli"]."','".$json["monthtodatesnowfallm"]."','".$json["precipi"]."','".$json["precipm"]."','".$json["precipsource"]."',".$json["rain"].",'".$json["since1jancoolingdegreedays"]."','".$json["since1jancoolingdegreedaysnormal"]."','".$json["since1julheatingdegreedays"]."','".$json["since1julheatingdegreedaysnormal"]."','".$json["since1julsnowfalli"]."','".$json["since1julsnowfallm"]."','".$json["since1sepcoolingdegreedays"]."','".$json["since1sepcoolingdegreedaysnormal"]."','".$json["since1sepheatingdegreedays"]."','".$json["since1sepheatingdegreedaysnormal"]."',".$json["snow"].",'".$json["snowdepthi"]."','".$json["snowdepthm"]."','".$json["snowfalli"]."','".$json["snowfallm"]."',".$json["thunder"].",".$json["tornado"].")

        ";        
        
        if (!mysqli_query($conn, $sql)) {
            die("Error: " . $sql . "<br>" . mysqli_error($conn));
        }

        echo var_dump($json) . "\n\n";

    }
    
    //close
    mysqli_close($conn);
?>

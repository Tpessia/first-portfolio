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

        maxtempi FLOAT,

        maxtempm FLOAT,

        meantempi FLOAT,

        meantempm FLOAT,

        mintempi FLOAT,

        mintempm FLOAT,

        maxdewpti FLOAT,

        maxdewptm FLOAT,

        meandewpti FLOAT,

        meandewptm FLOAT,

        mindewpti FLOAT,

        mindewptm FLOAT,

        maxvisi FLOAT,

        maxvism FLOAT,

        meanvisi FLOAT,

        meanvism FLOAT,

        minvisi FLOAT,

        minvism FLOAT,

        maxpressurei FLOAT,

        maxpressurem FLOAT,

        meanpressurei FLOAT,

        meanpressurem FLOAT,

        minpressurei FLOAT,

        minpressurem FLOAT,

        maxwspdi FLOAT,

        maxwspdm FLOAT,

        meanwindspdi FLOAT,

        meanwindspdm FLOAT,

        minwspdi FLOAT,

        minwspdm FLOAT,

        meanwdird FLOAT,

        meanwdire VARCHAR(255),

        humidity FLOAT,

        maxhumidity FLOAT,

        minhumidity FLOAT,

        precipi FLOAT,

        precipm FLOAT,

        precipsource VARCHAR(255),

        fog BIT,

        hail BIT,

        rain BIT,

        snow BIT,

        thunder BIT,

        tornado BIT,

        snowdepthi VARCHAR(255),

        snowdepthm VARCHAR(255),

        snowfalli VARCHAR(255),

        snowfallm VARCHAR(255),

        coolingdegreedays FLOAT,

        coolingdegreedaysnormal FLOAT,

        heatingdegreedays FLOAT,

        heatingdegreedaysnormal FLOAT,

        gdegreedays FLOAT,

        monthtodatecoolingdegreedays VARCHAR(255),

        monthtodatecoolingdegreedaysnormal VARCHAR(255),

        monthtodateheatingdegreedays VARCHAR(255),

        monthtodateheatingdegreedaysnormal VARCHAR(255),

        monthtodatesnowfalli VARCHAR(255),

        monthtodatesnowfallm VARCHAR(255),

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

        UNIQUE (date)

    );

    ";

    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
        
    //insert

    foreach ($_POST as $json) {

        $sql = "

            INSERT INTO sao_paulo_summary (date, maxtempi, maxtempm, meantempi, meantempm, mintempi, mintempm, maxdewpti, maxdewptm, meandewpti, meandewptm, mindewpti, mindewptm, maxvisi, maxvism, meanvisi, meanvism, minvisi, minvism, maxpressurei, maxpressurem, meanpressurei, meanpressurem, minpressurei, minpressurem, maxwspdi, maxwspdm, meanwindspdi, meanwindspdm, minwspdi, minwspdm, meanwdird, meanwdire, humidity, maxhumidity, minhumidity, precipi, precipm, precipsource, fog, hail, rain, snow, thunder, tornado, snowdepthi, snowdepthm, snowfalli, snowfallm, coolingdegreedays, coolingdegreedaysnormal, heatingdegreedays, heatingdegreedaysnormal, gdegreedays, monthtodatecoolingdegreedays, monthtodatecoolingdegreedaysnormal, monthtodateheatingdegreedays, monthtodateheatingdegreedaysnormal, monthtodatesnowfalli, monthtodatesnowfallm, since1jancoolingdegreedays, since1jancoolingdegreedaysnormal, since1julheatingdegreedays, since1julheatingdegreedaysnormal, since1julsnowfalli, since1julsnowfallm, since1sepcoolingdegreedays, since1sepcoolingdegreedaysnormal, since1sepheatingdegreedays, since1sepheatingdegreedaysnormal)
            VALUES ('".$json["date"]."','".$json["maxtempi"]."','".$json["maxtempm"]."','".$json["meantempi"]."','".$json["meantempm"]."','".$json["mintempi"]."','".$json["mintempm"]."','".$json["maxdewpti"]."','".$json["maxdewptm"]."','".$json["meandewpti"]."','".$json["meandewptm"]."','".$json["mindewpti"]."','".$json["mindewptm"]."','".$json["maxvisi"]."','".$json["maxvism"]."','".$json["meanvisi"]."','".$json["meanvism"]."','".$json["minvisi"]."','".$json["minvism"]."','".$json["maxpressurei"]."','".$json["maxpressurem"]."','".$json["meanpressurei"]."','".$json["meanpressurem"]."','".$json["minpressurei"]."','".$json["minpressurem"]."','".$json["maxwspdi"]."','".$json["maxwspdm"]."','".$json["meanwindspdi"]."','".$json["meanwindspdm"]."','".$json["minwspdi"]."','".$json["minwspdm"]."','".$json["meanwdird"]."','".$json["meanwdire"]."','".$json["humidity"]."','".$json["maxhumidity"]."','".$json["minhumidity"]."','".$json["precipi"]."','".$json["precipm"]."','".$json["precipsource"]."',".$json["fog"].",".$json["hail"].",".$json["rain"].",".$json["snow"].",".$json["thunder"].",".$json["tornado"].",'".$json["snowdepthi"]."','".$json["snowdepthm"]."','".$json["snowfalli"]."','".$json["snowfallm"]."','".$json["coolingdegreedays"]."','".$json["coolingdegreedaysnormal"]."','".$json["heatingdegreedays"]."','".$json["heatingdegreedaysnormal"]."','".$json["gdegreedays"]."','".$json["monthtodatecoolingdegreedays"]."','".$json["monthtodatecoolingdegreedaysnormal"]."','".$json["monthtodateheatingdegreedays"]."','".$json["monthtodateheatingdegreedaysnormal"]."','".$json["monthtodatesnowfalli"]."','".$json["monthtodatesnowfallm"]."','".$json["since1jancoolingdegreedays"]."','".$json["since1jancoolingdegreedaysnormal"]."','".$json["since1julheatingdegreedays"]."','".$json["since1julheatingdegreedaysnormal"]."','".$json["since1julsnowfalli"]."','".$json["since1julsnowfallm"]."','".$json["since1sepcoolingdegreedays"]."','".$json["since1sepcoolingdegreedaysnormal"]."','".$json["since1sepheatingdegreedays"]."','".$json["since1sepheatingdegreedaysnormal"]."')
            ON DUPLICATE KEY UPDATE maxtempi=VALUES(maxtempi),maxtempm=VALUES(maxtempm),meantempi=VALUES(meantempi),meantempm=VALUES(meantempm),mintempi=VALUES(mintempi),mintempm=VALUES(mintempm),maxdewpti=VALUES(maxdewpti),maxdewptm=VALUES(maxdewptm),meandewpti=VALUES(meandewpti),meandewptm=VALUES(meandewptm),mindewpti=VALUES(mindewpti),mindewptm=VALUES(mindewptm),maxvisi=VALUES(maxvisi),maxvism=VALUES(maxvism),meanvisi=VALUES(meanvisi),meanvism=VALUES(meanvism),minvisi=VALUES(minvisi),minvism=VALUES(minvism),maxpressurei=VALUES(maxpressurei),maxpressurem=VALUES(maxpressurem),meanpressurei=VALUES(meanpressurei),meanpressurem=VALUES(meanpressurem),minpressurei=VALUES(minpressurei),minpressurem=VALUES(minpressurem),maxwspdi=VALUES(maxwspdi),maxwspdm=VALUES(maxwspdm),meanwindspdi=VALUES(meanwindspdi),meanwindspdm=VALUES(meanwindspdm),minwspdi=VALUES(minwspdi),minwspdm=VALUES(minwspdm),meanwdird=VALUES(meanwdird),meanwdire=VALUES(meanwdire),humidity=VALUES(humidity),maxhumidity=VALUES(maxhumidity),minhumidity=VALUES(minhumidity),precipi=VALUES(precipi),precipm=VALUES(precipm),precipsource=VALUES(precipsource),fog=VALUES(fog),hail=VALUES(hail),rain=VALUES(rain),snow=VALUES(snow),thunder=VALUES(thunder),tornado=VALUES(tornado),snowdepthi=VALUES(snowdepthi),snowdepthm=VALUES(snowdepthm),snowfalli=VALUES(snowfalli),snowfallm=VALUES(snowfallm),coolingdegreedays=VALUES(coolingdegreedays),coolingdegreedaysnormal=VALUES(coolingdegreedaysnormal),heatingdegreedays=VALUES(heatingdegreedays),heatingdegreedaysnormal=VALUES(heatingdegreedaysnormal),gdegreedays=VALUES(gdegreedays),monthtodatecoolingdegreedays=VALUES(monthtodatecoolingdegreedays),monthtodatecoolingdegreedaysnormal=VALUES(monthtodatecoolingdegreedaysnormal),monthtodateheatingdegreedays=VALUES(monthtodateheatingdegreedays),monthtodateheatingdegreedaysnormal=VALUES(monthtodateheatingdegreedaysnormal),monthtodatesnowfalli=VALUES(monthtodatesnowfalli),monthtodatesnowfallm=VALUES(monthtodatesnowfallm),since1jancoolingdegreedays=VALUES(since1jancoolingdegreedays),since1jancoolingdegreedaysnormal=VALUES(since1jancoolingdegreedaysnormal),since1julheatingdegreedays=VALUES(since1julheatingdegreedays),since1julheatingdegreedaysnormal=VALUES(since1julheatingdegreedaysnormal),since1julsnowfalli=VALUES(since1julsnowfalli),since1julsnowfallm=VALUES(since1julsnowfallm),since1sepcoolingdegreedays=VALUES(since1sepcoolingdegreedays),since1sepcoolingdegreedaysnormal=VALUES(since1sepcoolingdegreedaysnormal),since1sepheatingdegreedays=VALUES(since1sepheatingdegreedays),since1sepheatingdegreedaysnormal=VALUES(since1sepheatingdegreedaysnormal)

        ";        
        
        if (!mysqli_query($conn, $sql)) {
            die("Error: " . $sql . "<br>" . mysqli_error($conn));
        }

        echo var_dump($json) . "\n\n";

    }
    
    //close
    mysqli_close($conn);
?>

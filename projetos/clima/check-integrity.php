<?php    
    $servername = preg_match('/localhost/' ,$_SERVER["SERVER_NAME"]) ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
    $dbname = "u312806541_clima";
    $username = "u312806541_admin";
    $password = "PoZvHuYgMtIp&314159";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }   
    
    // Check for gaps between dates
    // $sql = '

    //     SELECT t1.date - 1
    //     FROM sao_paulo_summary t1
    //     LEFT JOIN sao_paulo_summary t2 on t2.date = t1.date - 1
    //     WHERE t2.date IS NULL AND DATE_FORMAT(t1.date - 1,"%d") <> "00"
    //     LIMIT 1,18446744073709551615;

    // ';

    // Pré verificação 0,0,0,0,0,0,0.....
    // SELECT * FROM sao_paulo_summary AS s WHERE s.maxtempi = 0 AND s.maxtempm = 0 AND s.meantempi = 0 AND s.meantempm = 0 AND s.mintempi = 0 AND s.mintempm = 0 AND s.maxdewpti = 0 AND s.maxdewptm = 0 AND s.meandewpti = 0 AND s.meandewptm = 0 AND s.mindewpti = 0 AND s.mindewptm = 0 AND s.maxvisi = 0 AND s.maxvism = 0 AND s.meanvisi = 0 AND s.meanvism = 0 AND s.minvisi = 0 AND s.minvism = 0 AND s.maxpressurei = 0 AND s.maxpressurem = 0 AND s.meanpressurei = 0 AND s.meanpressurem = 0 AND s.minpressurei = 0 AND s.minpressurem = 0 AND s.maxwspdi = 0 AND s.maxwspdm = 0 AND s.meanwindspdi = 0 AND s.meanwindspdm = 0 AND s.minwspdi = 0 AND s.minwspdm = 0 ORDER BY s.ID

    // Verifica se (quase) todos os dados são 0, pois é inválido
    $sql = '

        UPDATE sao_paulo_summary as s
        SET s.maxtempi = NULL, s.maxtempm = NULL, s.meantempi = NULL, s.meantempm = NULL, s.mintempi = NULL, s.mintempm = NULL, s.maxdewpti = NULL, s.maxdewptm = NULL, s.meandewpti = NULL, s.meandewptm = NULL, s.mindewpti = NULL, s.mindewptm = NULL, s.maxvisi = NULL, s.maxvism = NULL, s.meanvisi = NULL, s.meanvism = NULL, s.minvisi = NULL, s.minvism = NULL, s.maxpressurei = NULL, s.maxpressurem = NULL, s.meanpressurei = NULL, s.meanpressurem = NULL, s.minpressurei = NULL, s.minpressurem = NULL, s.maxwspdi = NULL, s.maxwspdm = NULL, s.meanwindspdi = NULL, s.meanwindspdm = NULL, s.minwspdi = NULL, s.minwspdm = NULL, s.meanwdird = NULL, s.meanwdire = NULL, s.humidity = NULL, s.maxhumidity = NULL, s.minhumidity = NULL, s.precipi = NULL, s.precipm = NULL, s.precipsource = NULL, s.fog = NULL, s.hail = NULL, s.rain = NULL, s.snow = NULL, s.thunder = NULL, s.tornado = NULL, s.snowdepthi = NULL, s.snowdepthm = NULL, s.snowfalli = NULL, s.snowfallm = NULL, s.coolingdegreedays = NULL, s.coolingdegreedaysnormal = NULL, s.heatingdegreedays = NULL, s.heatingdegreedaysnormal = NULL, s.gdegreedays = NULL, s.monthtodatecoolingdegreedays = NULL, s.monthtodatecoolingdegreedaysnormal = NULL, s.monthtodateheatingdegreedays = NULL, s.monthtodateheatingdegreedaysnormal = NULL, s.monthtodatesnowfalli = NULL, s.monthtodatesnowfallm = NULL, s.since1jancoolingdegreedays = NULL, s.since1jancoolingdegreedaysnormal = NULL, s.since1julheatingdegreedays = NULL, s.since1julheatingdegreedaysnormal = NULL, s.since1julsnowfalli = NULL, s.since1julsnowfallm = NULL, s.since1sepcoolingdegreedays = NULL, s.since1sepcoolingdegreedaysnormal = NULL, s.since1sepheatingdegreedays = NULL, s.since1sepheatingdegreedaysnormal = NULL
        WHERE s.maxtempi = 0 AND s.maxtempm = 0 AND s.meantempi = 0 AND s.meantempm = 0 AND s.mintempi = 0 AND s.mintempm = 0 AND s.maxdewpti = 0 AND s.maxdewptm = 0 AND s.meandewpti = 0 AND s.meandewptm = 0 AND s.mindewpti = 0 AND s.mindewptm = 0 AND s.maxvisi = 0 AND s.maxvism = 0 AND s.meanvisi = 0 AND s.meanvism = 0 AND s.minvisi = 0 AND s.minvism = 0 AND s.maxpressurei = 0 AND s.maxpressurem = 0 AND s.meanpressurei = 0 AND s.meanpressurem = 0 AND s.minpressurei = 0 AND s.minpressurem = 0 AND s.maxwspdi = 0 AND s.maxwspdm = 0 AND s.meanwindspdi = 0 AND s.meanwindspdm = 0 AND s.minwspdi = 0 AND s.minwspdm = 0

    ';

    $clear = mysqli_query($conn, $sql);

    // if ($clear) {
    //     echo mysqli_num_rows($clear) . " rows returned" . "<br>";
    // } else {
    //     die("Error: " . $sql . "<br>" . mysqli_error($conn));
    // }

    // Pré verificação max,mean,min temp = 0
    // SELECT * FROM sao_paulo_summary AS s WHERE s.maxtempm = 0 AND s.meantempm = 0 AND s.mintempm = 0 ORDER BY s.ID

    // Verifica se as temperaturas max, mean e min = 0
    $sql2 = '
    
        UPDATE sao_paulo_summary as s
        SET s.maxtempm = NULL, s.meantempm = NULL, s.mintempm = NULL
        WHERE s.maxtempm = 0 AND s.meantempm = 0 AND s.mintempm = 0

    ';

    $clear2 = mysqli_query($conn, $sql2);

    // if ($clear2) {
    //     echo mysqli_num_rows($clear2) . " rows returned" . "<br>";
    // } else {
    //     die("Error: " . $sql2 . "<br>" . mysqli_error($conn));
    // }
    
    mysqli_close($conn);
?>
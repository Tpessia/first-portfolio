<?php

if (isset($_GET["qnt"])) {

    if (isset($_GET["date"])) {
        $init_date = new DateTime($_GET["date"] . "Z");
    }
    else {
        $last = file_get_contents("https://www.pessia.xyz/projetos/weather/get-last.php");
        
        if($last != "0") {
            $init_date = new DateTime($last . "Z");
            date_add($init_date, new DateInterval('P1D'));
        }
        else {
            die("Failed to create initial date!");
        }
    }

    $qnt = intval($_GET["qnt"]);
    
    $today = new DateTime();

    for ($i = $qnt; $i > 0; $i--) {
        
        $interval = date_diff($init_date, $today);
        $dif = intval($interval->format('%R%a'));

        if ($dif > 0) {
            $json = file_get_contents("http://api.wunderground.com/api/863a1b76beeb23bd/history_" . $init_date->format('Ymd') . "/q/zmw:00000.100.83779.json");

            $data = json_decode($json, true);

            if (isset($data["history"]["dailysummary"][0])) {
                do_post_request("https://www.pessia.xyz/projetos/weather/insert-daily.php", http_build_query(summaryData($data)));
            }

            if (isset($data["history"]["observations"][0])) {
                do_post_request("https://www.pessia.xyz/projetos/weather/insert-hours.php", http_build_query(hourlyData($data)));
            }

            echo $init_date->format('Y-m-d') . " (" . ($qnt - $i + 1) . " / " . $qnt . ")" . "<br><br>";

            date_add($init_date, new DateInterval('P1D'));
        }

    }

}
else {
    
    echo '"date" parameter is undefined!';

}

// $json = file_get_contents("http://api.wunderground.com/api/863a1b76beeb23bd/history_19960701/q/zmw:00000.100.83779.json");

// $json = ' string(2264) " { "response": { "version":"0.1", "termsofService":"http://www.wunderground.com/weather/api/d/terms.html", "features": { "history": 1 } } , "history": { "date": { "pretty": "June 30, 1996", "year": "1996", "mon": "06", "mday": "30", "hour": "21", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "July 1, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "00", "min": "00", "tzname": "UTC" }, "observations": [ { "date": { "pretty": "9:00 PM -03 on June 30, 1996", "year": "1996", "mon": "06", "mday": "30", "hour": "21", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "12:00 AM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "00", "min": "00", "tzname": "UTC" }, "tempm":"11.0", "tempi":"51.8","dewptm":"10.0", "dewpti":"50.0","hum":"94","wspdm":"13.0", "wspdi":"8.1","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"150","wdire":"SSE","vism":"7.0", "visi":"4.3","pressurem":"1028", "pressurei":"30.36","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Clear","icon":"clear","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBSP 0000Z 15007KT 7000 SKC 11/10 Q1028" }, { "date": { "pretty": "10:00 PM -03 on June 30, 1996", "year": "1996", "mon": "06", "mday": "30", "hour": "22", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "1:00 AM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "01", "min": "00", "tzname": "UTC" }, "tempm":"11.0", "tempi":"51.8","dewptm":"10.0", "dewpti":"50.0","hum":"94","wspdm":"11.1", "wspdi":"6.9","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"150","wdire":"SSE","vism":"7.0", "visi":"4.3","pressurem":"1028", "pressurei":"30.36","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Clear","icon":"clear","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBSP 0100Z 15006KT 7000 SKC 11/10 Q1028" } ], "dailysummary": [ ] } } " ';

// $json = ' { "response": { "version":"0.1", "termsofService":"http://www.wunderground.com/weather/api/d/terms.html", "features": { "history": 1 } } , "history": { "date": { "pretty": "July 1, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "07", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "July 1, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "10", "min": "00", "tzname": "UTC" }, "observations": [ { "date": { "pretty": "7:00 AM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "07", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "10:00 AM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "10", "min": "00", "tzname": "UTC" }, "tempm":"11.0", "tempi":"51.8","dewptm":"10.0", "dewpti":"50.0","hum":"94","wspdm":"22.2", "wspdi":"13.8","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"60","wdire":"ENE","vism":"3.0", "visi":"1.9","pressurem":"1026", "pressurei":"30.30","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Overcast","icon":"cloudy","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 011000Z 06012KT 3000 BR OVC007 11/10 Q1026" }, { "date": { "pretty": "9:00 AM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "09", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "12:00 PM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "12", "min": "00", "tzname": "UTC" }, "tempm":"13.0", "tempi":"55.4","dewptm":"10.0", "dewpti":"50.0","hum":"82","wspdm":"18.5", "wspdi":"11.5","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"60","wdire":"ENE","vism":"8.0", "visi":"5.0","pressurem":"1027", "pressurei":"30.33","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Mostly Cloudy","icon":"mostlycloudy","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 011200Z 06010KT 8000 BKN015 13/10 Q1027" }, { "date": { "pretty": "10:00 AM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "10", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "1:00 PM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "13", "min": "00", "tzname": "UTC" }, "tempm":"14.0", "tempi":"57.2","dewptm":"12.0", "dewpti":"53.6","hum":"88","wspdm":"27.8", "wspdi":"17.3","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"90","wdire":"East","vism":"10.0", "visi":"6.2","pressurem":"1027", "pressurei":"30.33","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Mostly Cloudy","icon":"mostlycloudy","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 011300Z 09015KT 9999 BKN020 14/12 Q1027" }, { "date": { "pretty": "12:00 PM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "12", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "3:00 PM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "15", "min": "00", "tzname": "UTC" }, "tempm":"16.0", "tempi":"60.8","dewptm":"13.0", "dewpti":"55.4","hum":"82","wspdm":"14.8", "wspdi":"9.2","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"90","wdire":"East","vism":"10.0", "visi":"6.2","pressurem":"1026", "pressurei":"30.30","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Partly Cloudy","icon":"partlycloudy","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 011500Z 09008KT 9999 FEW020 16/13 Q1026" }, { "date": { "pretty": "1:00 PM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "13", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "4:00 PM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "16", "min": "00", "tzname": "UTC" }, "tempm":"18.0", "tempi":"64.4","dewptm":"13.0", "dewpti":"55.4","hum":"73","wspdm":"14.8", "wspdi":"9.2","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"100","wdire":"East","vism":"-9999.0", "visi":"-9999.0","pressurem":"-9999", "pressurei":"-9999","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Clear","icon":"clear","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 011600Z 10008KT CAVOK 18/13 Q1 024" }, { "date": { "pretty": "6:00 PM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "18", "min": "00", "tzname": "America/Sao_Paulo" }, "utcdate": { "pretty": "9:00 PM GMT on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "21", "min": "00", "tzname": "UTC" }, "tempm":"15.0", "tempi":"59.0","dewptm":"15.0", "dewpti":"59.0","hum":"100","wspdm":"14.8", "wspdi":"9.2","wgustm":"-9999.0", "wgusti":"-9999.0","wdird":"180","wdire":"South","vism":"2.0", "visi":"1.2","pressurem":"1023", "pressurei":"30.21","windchillm":"-999", "windchilli":"-999","heatindexm":"-9999", "heatindexi":"-9999","precipm":"-9999.00", "precipi":"-9999.00","conds":"Mostly Cloudy","icon":"mostlycloudy","fog":"0","rain":"0","snow":"0","hail":"0","thunder":"0","tornado":"0","metar":"METAR SBMT 012100Z 18008KT 2000 BR FEW013 BKN080 15/15 Q1023" } ], "dailysummary": [ { "date": { "pretty": "7:00 AM -03 on July 01, 1996", "year": "1996", "mon": "07", "mday": "01", "hour": "07", "min": "00", "tzname": "America/Sao_Paulo" }, "fog":"0","rain":"0","snow":"0","snowfallm":"", "snowfalli":"","monthtodatesnowfallm":"", "monthtodatesnowfalli":"","since1julsnowfallm":"", "since1julsnowfalli":"","snowdepthm":"", "snowdepthi":"","hail":"0","thunder":"0","tornado":"0","meantempm":"14", "meantempi":"58","meandewptm":"12", "meandewpti":"54","meanpressurem":"1025.80", "meanpressurei":"30.29","meanwindspdm":"15", "meanwindspdi":"9","meanwdire":"East","meanwdird":"92","meanvism":"6.6", "meanvisi":"4.1","humidity":"86","maxtempm":"18", "maxtempi":"64","mintempm":"11", "mintempi":"51","maxhumidity":"100","minhumidity":"73","maxdewptm":"15", "maxdewpti":"59","mindewptm":"10", "mindewpti":"50","maxpressurem":"1027", "maxpressurei":"30.33","minpressurem":"1023", "minpressurei":"30.21","maxwspdm":"28", "maxwspdi":"17","minwspdm":"15", "minwspdi":"9","maxvism":"10.0", "maxvisi":"6.2","minvism":"2.0", "minvisi":"1.2","gdegreedays":"8","heatingdegreedays":"8","coolingdegreedays":"0","precipm":"0.0", "precipi":"0.00","precipsource":"3Or6HourObs","heatingdegreedaysnormal":"","monthtodateheatingdegreedays":"","monthtodateheatingdegreedaysnormal":"","since1sepheatingdegreedays":"","since1sepheatingdegreedaysnormal":"","since1julheatingdegreedays":"","since1julheatingdegreedaysnormal":"","coolingdegreedaysnormal":"","monthtodatecoolingdegreedays":"","monthtodatecoolingdegreedaysnormal":"","since1sepcoolingdegreedays":"","since1sepcoolingdegreedaysnormal":"","since1jancoolingdegreedays":"","since1jancoolingdegreedaysnormal":"" } ] } } ';

// BUILD SUMMARY DATA

function summaryData($data) {
    $resumo = $data["history"]["dailysummary"][0];

    $date = $resumo["date"];
    $dateStr = $date["year"] . "-" . $date["mon"] . "-" . $date["mday"];
    
    $json = array(
        "0" => array(
            "date" => $dateStr
        )    
    );
    
    foreach ($resumo as $label => $dado) {
        
        if (gettype($dado) != "array") {
            
            $json["0"][$label] = $dado;
            
        }
        
    }
    
    return $json;
}

// BUILD HOURLY DATA

function hourlyData($data) {
    $json = array();
    
    $horas = $data["history"]["observations"];
    
    foreach ($horas as $i => $dados) {
        
        $date = $dados["date"];
        $dateStr = $date["year"] . "-" . $date["mon"] . "-" . $date["mday"];
        $dateTimeStr = $dateStr . " " . $date["hour"] . ":" . $date["min"];
        
        $json[$i] = array(
            
            "date" => $dateStr,
            "datetime" => $dateTimeStr
        
        );
        
        foreach ($dados as $label => $dado) {
            
            if (gettype($dado) != "array") {
            
                $json[$i][$label] = $dado;
                
            }
            
        }
        
    }
    
    return $json;
}

// CREATE POST REQUEST

function do_post_request($url, $data, $optional_headers = null) {
  $params = array('http' => array(
              'method' => 'POST',
              'content' => $data
            ));
  if ($optional_headers !== null) {
    $params['http']['header'] = $optional_headers;
  }
  $ctx = stream_context_create($params);
  $fp = @fopen($url, 'rb', false, $ctx);
  if (!$fp) {
    throw new Exception("Problem with $url, $php_errormsg");
  }
  $response = @stream_get_contents($fp);
  if ($response === false) {
    throw new Exception("Problem reading data from $url, $php_errormsg");
  }
  return $response;
}

?>
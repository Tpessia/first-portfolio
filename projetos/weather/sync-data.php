<?php

if (isset($_GET["qnt"])) {

    if (isset($_GET["date"])) {
        $init_date = new DateTime($_GET["date"]);
    }
    else {
        $last = file_get_contents("https://www.pessia.xyz/projetos/weather/get-last.php");
        
        if($last != "0") {
            $init_date = new DateTime($last);
            date_add($init_date, new DateInterval('P1D'));
        }
        else {
            $init_date = new DateTime("1996-06-30");
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

            echo $init_date->format('Y-m-d') . " (" . ($qnt - $i + 1) . " / " . $qnt . ")" . "<br><br>";

            if (isset($data["history"]["dailysummary"][0]) && !(intval($data["history"]["dailysummary"][0]["date"]["year"]) == 1969 && intval($data["history"]["dailysummary"][0]["date"]["mon"]) == 12 && intval($data["history"]["dailysummary"][0]["date"]["mday"]) == 31)) {
                echo do_post_request("https://www.pessia.xyz/projetos/weather/insert-daily.php", http_build_query(summaryData($data)));
            }
            else {
                echo do_post_request("https://www.pessia.xyz/projetos/weather/insert-daily.php", http_build_query(array(

                    "null" => array(

                        "date" => $init_date->format('Y-m-d')
                        
                    )

                )));
            }

            if (isset($data["history"]["observations"][0])) {
                do_post_request("https://www.pessia.xyz/projetos/weather/insert-hours.php", http_build_query(hourlyData($data)));
            }
            else {
                do_post_request("https://www.pessia.xyz/projetos/weather/insert-hours.php", http_build_query(array(

                    "null" => array(

                        "date" => $init_date->format('Y-m-d'),
                        "datetime" => $init_date->format('Y-m-d') . " 00:00"

                    )

                )));
            }

            date_add($init_date, new DateInterval('P1D'));

            sleep(6);
        }
        else {
            
            break;

        }

    }

}
else {
    
    echo '"date" parameter is undefined!';

}

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
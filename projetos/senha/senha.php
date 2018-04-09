<?php
    if ($_POST['login'] == "james") {
        $string = "CrIpToGrAfIa";
        $newstring = $string;
    
        $numeric = $_POST["numeric"];
    
        $key = $_POST['key'];
        $keyLen = strlen($key);
        $keyCode = 1;

        for ($i=0;$i<strlen($key);$i++) {
        	$keyCode *= ord($key[$i]);
        }
        
        $finalKey = $keyLen * $keyCode;
    
        $strongerChars = "@!$&?";
        
        if ($keyLen == 0) {
            echo "Insira um parâmetro \"key\" na URL!";
            die();
        }
        
        if ($numeric < 1) {
            for ($i=0;$i<strlen($string);$i++) {
        
                $ascii = ord($string[$i]);
                
                $ascii += $finalKey;
                
                while ($ascii > 122) { #check fo oveflow (e.g. if ascii == 123, ascii should be 65, as it is 1 number beyond 122 (z), and should get back to 65 (A)
                    $rest = $ascii - 122;
                    $ascii = 64 + $rest;
                }
                
                if ($ascii > 90 && $ascii < 97) { #skip other chars (_, `, etc) to a
                    $ascii = 97;
                }
                
                $newstring[$i] = chr($ascii);
            }
            
            $choosenChar = $strongerChars[$finalKey%strlen($strongerChars)];
            
            echo $newstring . $choosenChar; #final key
        }
        else {
            while (strlen(strval($finalKey)) < $numeric) {
            	$finalKey = pow($finalKey,2);
            }
            if (strlen(strval($finalKey)) > $numeric) {
            	$finalKey = intval(substr(strval($finalKey), 0, $numeric));
            }
            
            echo $finalKey;
        }
    }
    else {
        echo "Login Incorreto";
    }
?>
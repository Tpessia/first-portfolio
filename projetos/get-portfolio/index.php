<?php
    $url = 'https://api.kinvo.com.br/statement/GetPortfolioStatement';
    //$data = array('key1' => 'value1', 'key2' => 'value2');

    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header' => "Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmVuZWRhbmllbEBnbWFpbC5jb20iLCJzdWIiOiIxMDM2NCIsImVtYWlsIjoiYmVuZWRhbmllbEBHbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiRGFuaWVsIEJlbmV2aWRlcyIsImNfaGFzaCI6ImI3NTQ3OGZiLTFjZWYtNGM4Yi05MWFlLTdhOWFjZjhmYjFlMSIsImp0aSI6ImQwYjMzYjFjLTZmMDQtNDFiYS05ODJkLTBiNWE0ZGM0NWY2NyIsImlhdCI6MTU0NTIxNDAwNCwicHJhZ21hIjoid2ViIiwibmJmIjoxNTQ1MjE0MDA0LCJleHAiOjE1NDUzMDA0MDQsImlzcyI6IktpbnZBUEkiLCJhdWQiOiIqIn0.H5fKYkD15GiUEULoMNl6N0i8RYUoe-DnhdeEFQAEOhw\r\n" . 
                "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => '{"portfolioId":17373,"offset":0,"fetch":99999}'#http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { /* Handle error */ }

    var_dump($result);
?>
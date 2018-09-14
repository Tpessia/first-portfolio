'use strict';

var request = require('request');

var five = require("johnny-five"), //load johnny five package
    board = new five.Board({port:"COM3"}); //create board obj

board.on('ready', function () { //on arduino ready
    console.log('Arduino is ready.');

    var led = new five.Pin(12); //create led obj
    var portao = new five.Pin(11); //create led obj
    portao.write(1)

    var currentState;
    led.read(function (error, value) {
        currentState = value;
    });

    var interval = setInterval(requests, 1000);
    var sending = false;
    function requests() {
        request('http://www.thiagopessia.com/arduino/assets/php/portao.bin' + '?' + (Math.random() * Math.random()), function (error, response, body) {
            // receive input
            if (!error && response.statusCode == 200) {
                var data = parseInt(body);

                if(data==1 && !sending){
                    sending = true;
                    console.log("Portão acionado!");
                    portao.write(0);
                    setTimeout(function(){portao.write(1);},500);
                    setTimeout(function(){sending=false;},1500);
                }
            }
        });

        request('http://www.thiagopessia.com/arduino/assets/php/input.bin' + '?' + (Math.random() * Math.random()), function (error, response, body) {
            // receive input
            if (!error && response.statusCode == 200) {
                var data = parseInt(body);

                if (data != currentState) { //evita que o código altere o arduino se nada for alterado
                    console.log("input received - " + data);
                    led.write(data);
                }
            }
        });

        request('http://www.thiagopessia.com/arduino/assets/php/ledStatus.php' + '?' + 'output=' + currentState);

        request('http://www.thiagopessia.com/arduino/assets/php/serverStatus.php');
    }
});

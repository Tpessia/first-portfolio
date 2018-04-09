'use strict';

var five = require("johnny-five"),
    board = new five.Board({ port: "COM3", repl: false, debug: false });

board.on('ready', function () {
    var led = new five.Pin(7);
    led.write(1);
});

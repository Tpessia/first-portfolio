// var five = require("johnny-five"),
//     board = new five.Board({port:"COM2"});

// board.on("ready", function() {
// //   (new five.Led(13)).strobe(1000);
//     var led = new five.Led(13);

//     led.on();

//     setTimeout(function() {led.off()}, 2000);
// });




//connect with 192.168.1.8:3000


'use strict';

var five = require("johnny-five"), //load johnny five package
    board = new five.Board({port:"COM2"}); //create board obj
const express = require('express'); //load express (server) package
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); //load socket package (client-server real time connection)

app.use(express.static(__dirname + '/public')); //create server
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

board.on('ready', function () { //on arduino ready
    console.log('Arduino is ready.');

    let toggle = function (state) { //function to change arduino state depending on the value of the parameter received from the client.on('state')
        console.log("state change phase 2 - " + state)
        state == 0 ? led.off() : led.on();
    };

    var led = new five.Led(13); //create led obj

    led.off(); //starting led value

    // Listen to the web socket connection
    io.on('connection', function (client) { //wait for connection
        client.on('join', function (handshake) { //connetion done
            console.log(handshake);
            led.on(); //blink led when connetion done
            setTimeout(function () { led.off() }, 500);
            setTimeout(function () { led.on() }, 1000);
            setTimeout(function () { led.off() }, 1500);

            var myData = {bool: 0}
            client.emit('state', myData); // sempre que um usuario novo entra, piscamos o led e no final o deixamos desligado, resetando assim o range de todos os usuários para 0. O ideal é fazer com que o johnny five descubra o estado do led (0 ou 1), e modifique o estado do cliente que acabou de entrar para o estado correto.
            client.broadcast.emit('state', myData);
        });

        // Every time the user changes the range value, the client sends a "state" command that is listened by the server
        client.on('state', function (data) {

            console.log("state change phase 1");

            toggle(data.bool); //call change function, sending the range value via parameter

            client.emit('state', data); //send the value to client
            client.broadcast.emit('state', data); //send the value to all clients, including the one which the value was sent from
        });
    });
});

const port = process.env.PORT || 3000; //also server creating config

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
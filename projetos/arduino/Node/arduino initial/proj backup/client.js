// client.js

(function () {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    // var red = document.getElementById('red');
    // var green = document.getElementById('green');
    // var blue = document.getElementById('blue');

    var btn = document.getElementById("btn");

    // function emitValue(color, e) {
    //     socket.emit('state', {
    //         color: color,
    //         value: e.target.value
    //     });
    // }

    function emitValue(myBool) {
        console.log("state emited");
        socket.emit('state', {
            bool: myBool
        });
    }

    // red.addEventListener('change', emitValue.bind(null, 'red'));
    // blue.addEventListener('change', emitValue.bind(null, 'blue'));
    // green.addEventListener('change', emitValue.bind(null, 'green'));

    btn.addEventListener('click', emitValue.bind(btn.value)); //on click change data

    socket.on('connect', function (data) { //on connect
        socket.emit('join', 'Client is connected!');
    });

    socket.on('state', function (data) { //receive changed data
        btn.value = data.bool;
    });
}());
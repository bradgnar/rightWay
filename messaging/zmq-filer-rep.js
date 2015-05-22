'use strict';

const fs = require('fs'),
    zmq = require('zmq'),
    responder = zmq.socket('rep');

responder.on('message', function (data) {

    let request = JSON.parse(data);
    console.log('Received request to get: ' + request.path);

    fs.readFile(request.path, function (err, content) {
        console.log('sending response content');

        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

responder.bind('tcp://127.0.0.1:6666', function (err) {
    console.log('listening for zmq requesters...')
});

process.on('SIGNIT', function () {
    console.log('shutting down...');
    responder.close();
});
'use strict';

const fs = require('fs'),
    zmq = require('zmq'),
    publisher = zmq.socket('pub'),
    filename = process.argv[2];

//This will catch any change events to the given filename
fs.watch(filename, function () {

    //upon change the publisher will send a message to any of the subsribers
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }));
});

//binding itself to a port
publisher.bind('tcp://*:6666', function (err) {
    console.log('Listeninf for zmq subscreeeeebs...')
});
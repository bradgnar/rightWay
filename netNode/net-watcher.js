"use strict"

const net = require('net'),
    fs = require('fs'),
    filename = process.argv[2],
    server = net.createServer(function (connection) {

        //reporting
        console.log('Subscriber connected.')
        connection.write("Now watching '" + filename + "' for changes...\n");

        //watcher setup
        let watcher  =  fs.watch(filename, function () {
            connection.write("file " + filename + " has changed");
        });

        connection.on('close', function () {
            console.log('Subscriber disconnected');
            watcher.close();
        });
    });

if (!filename) {
    throw Error('No target filename was specified');
}


server.listen('/tmp/watcher.sock', function () {
    console.log('listening for subscreebees');
});
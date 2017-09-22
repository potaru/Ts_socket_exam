"use strict";
exports.__esModule = true;
var appx = require("express");
var httpx = require("http");
var iox = require("socket.io");
var config_1 = require("./config/config");
var main_1 = require("./router/main");
var app = appx();
var http = httpx.createServer(app);
var io = iox(http);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.use(appx.static(__dirname + '/public'));
app.use('/', main_1.router);
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(config_1["default"].port, function () {
    console.log('listening on *:' + config_1["default"].port + '');
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use('/cats', cats_route_1.default);
    };
    Server.prototype.setMiddleWare = function () {
        this.app.use(express.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            console.log('this is middleware');
            next();
        });
    };
    Server.prototype.listen = function () {
        var port = 8000;
        this.app.listen(port, function () {
            console.log('server connect');
        });
    };
    return Server;
}());
var server = new Server();
server.listen();
server.app.get('/', function (req, res) {
    res.send('hello world');
});
//# sourceMappingURL=app.js.map
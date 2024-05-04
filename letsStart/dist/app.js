"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var app = express();
var port = 8000;
app.use(express.json());
app.listen(port, function () {
    console.log('server connect');
});
app.get('/', function (req, res) {
    res.send('hello world');
});
app.use(function (req, res, next) {
    console.log('this is middleware');
    next();
});
app.use('/cats', cats_route_1.default);
//# sourceMappingURL=app.js.map
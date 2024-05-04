"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8000;
app.listen(port, function () {
    console.log('server connect');
});
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.post('/test', function (req, res) {
    res.send({ person: 'min' });
});
//# sourceMappingURL=app.js.map
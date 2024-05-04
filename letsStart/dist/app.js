"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
var data = [1, 2, 3, 4];
app.listen(port, function () {
    console.log('server connect');
});
app.get('/', function (req, res) {
    res.send({ Cat: app_model_1.Cat });
});
//# sourceMappingURL=app.js.map
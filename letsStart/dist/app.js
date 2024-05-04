"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
app.use(express.json());
var data = [1, 2, 3, 4];
app.listen(port, function () {
    console.log('server connect');
});
app.get('/', function (req, res) {
    res.send({ Cat: app_model_1.Cat });
});
app.use(function (req, res, next) {
    console.log('this is middleware');
    next();
});
app.get('/cats/blue', function (req, res) {
    res.send({ blue: app_model_1.Cat[0] });
});
app.get('/cats', function (req, res) {
    try {
        var cats = app_model_1.Cat;
        if (!cats)
            throw new Error('empty in cats');
        res.status(200).json({ data: cats });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get('/cats/:id', function (req, res) {
    try {
        var id_1 = req.params.id;
        if (!id_1)
            throw new Error('cannot find id');
        var cat = app_model_1.Cat.find(function (cat) { return cat.id === id_1; });
        if (!id_1)
            throw new Error('cannot find data');
        res.status(200).json({ cat: cat });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/cats', function (req, res) {
    try {
        var data_1 = req.body;
        if (!data_1)
            throw new Error('cannot read data');
        app_model_1.Cat.push(data_1);
        res.status(200).json({ Cat: app_model_1.Cat });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//# sourceMappingURL=app.js.map
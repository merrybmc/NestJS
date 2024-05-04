"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cats_model_1 = require("./cats.model");
var express_1 = require("express");
var router = express_1.Router();
router.get('/blue', function (req, res) {
    res.send({ blue: cats_model_1.Cat[0] });
});
router.get('/', function (req, res) {
    try {
        var cats = cats_model_1.Cat;
        if (!cats)
            throw new Error('empty in cats');
        res.status(200).json({ data: cats });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/:id', function (req, res) {
    try {
        var id_1 = req.params.id;
        if (!id_1)
            throw new Error('cannot find id');
        var cat = cats_model_1.Cat.find(function (cat) { return cat.id === id_1; });
        if (!id_1)
            throw new Error('cannot find data');
        res.status(200).json({ cat: cat });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/', function (req, res) {
    try {
        var data = req.body;
        if (!data)
            throw new Error('cannot read data');
        cats_model_1.Cat.push(data);
        res.status(200).json({ Cat: cats_model_1.Cat });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=cats.route.js.map
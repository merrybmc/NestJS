"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
router.put('/:id', function (req, res) {
    try {
        var id_2 = req.params.id;
        if (!id_2)
            throw new Error('cannot find id');
        var body_1 = req.body;
        var result_1;
        cats_model_1.Cat.forEach(function (cat) {
            if (cat.id === id_2) {
                cat = __assign(__assign({}, cat), body_1);
                result_1 = cat;
            }
        });
        res.status(200).json({ data: result_1 });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', function (req, res) {
    try {
        var id_3 = req.params.id;
        if (!id_3)
            throw new Error('cannot find id');
        var newCat = cats_model_1.Cat.filter(function (cat) { return cat.id !== id_3; });
        res.status(200).json({ data: newCat });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=cats.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cats_service_1 = require("./cats.service");
var router = express_1.Router();
router.get('/', cats_service_1.readAllCat);
router.get('/:id', cats_service_1.readCat);
router.post('/', cats_service_1.createCat);
router.put('/', cats_service_1.updateCat);
router.delete('/', cats_service_1.deleteCat);
exports.default = router;
//# sourceMappingURL=cats.route.js.map
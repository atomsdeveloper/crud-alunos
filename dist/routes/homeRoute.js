"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

// Controller
var _homeControllerjs = require('../controllers/homeController.js'); var _homeControllerjs2 = _interopRequireDefault(_homeControllerjs);

router.get("/", _homeControllerjs2.default.index);

exports. default = router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/

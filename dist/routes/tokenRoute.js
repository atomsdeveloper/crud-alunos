"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

// Controller
var _tokenControllerjs = require('../controllers/tokenController.js'); var _tokenControllerjs2 = _interopRequireDefault(_tokenControllerjs);

router.post("/", _tokenControllerjs2.default.store);

exports. default = router;

/*
 index -> List all Tokens -> GET
 show -> Show a Token  -> GET
 store -> Create a Token -> POST
 update -> Update a Token -> PUT
 delete -> Delete a Token -> DELETE
*/

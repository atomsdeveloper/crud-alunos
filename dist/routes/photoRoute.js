"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

// Multer
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerjs = require('../config/multer.js'); var _multerjs2 = _interopRequireDefault(_multerjs);

// Controller
var _photoControllerjs = require('../controllers/photoController.js'); var _photoControllerjs2 = _interopRequireDefault(_photoControllerjs);

// Middleware
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

const upload = _multer2.default.call(void 0, _multerjs2.default);

// Route
router.post("/", upload.single("file"), _loginRequiredjs2.default, _photoControllerjs2.default.store);

exports. default = router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/

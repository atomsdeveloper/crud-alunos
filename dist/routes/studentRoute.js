"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

// Middleware
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

// Controller
var _studentControllerjs = require('../controllers/studentController.js'); var _studentControllerjs2 = _interopRequireDefault(_studentControllerjs);

// Routes

// List all students
router.get("/", _studentControllerjs2.default.index);
router.get("/:id", _studentControllerjs2.default.show);
router.post("/create", _loginRequiredjs2.default, _studentControllerjs2.default.store);
router.put("/:id/edit", _loginRequiredjs2.default, _studentControllerjs2.default.update);
router.delete("/:id/delete", _loginRequiredjs2.default, _studentControllerjs2.default.delete);

exports. default = router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

// Middleware
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

// Controller
var _userControllerjs = require('../controllers/userController.js'); var _userControllerjs2 = _interopRequireDefault(_userControllerjs);

// Routes
// Not should be used in production
router.get("/", _userControllerjs2.default.index);
// router.get("/:id", UserController.show);

router.post("/create", _userControllerjs2.default.store);
router.put("/:id/edit", _loginRequiredjs2.default, _userControllerjs2.default.update);
router.delete("/:id/delete", _loginRequiredjs2.default, _userControllerjs2.default.delete);

exports. default = router;

/*
 index -> List all users -> GET
 show -> Show a user  -> GET
 store -> Create a user -> POST
 update -> Update a user -> PUT
 delete -> Delete a user -> DELETE
*/

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

exports. default = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the authorization header is present
  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Token não informado.",
    });
  }

  // Check if the token is in the correct format
  const [text, token] = authorization.split(" ");

  try {
    // Check if the token is in the correct format
    if (text !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido.",
      });
    }

    // Verify the token
    const decoded = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    const user = _Userjs2.default.findOne({
      where: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
      attributes: ["id", "name", "email"],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário inválido.",
      });
    }

    // Attach the user information to the request object
    req.userId = decoded.id;
    req.userName = decoded.name;
    req.userEmail = decoded.email;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
};

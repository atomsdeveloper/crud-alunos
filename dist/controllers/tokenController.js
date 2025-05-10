"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      // Validate the request body
      if (!email || !password) {
        return res.status(401).json({
          success: false,
          message: "Email e senha são obrigatórios.",
        });
      }

      // Check if the user exists
      const user = await _Userjs2.default.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      // Check if the password is correct
      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          success: false,
          message: "Senha incorreta.",
        });
      }

      // Generate a token (for now, we will just return a string)
      // In a real application, you would use a library like jsonwebtoken to generate a token
      const token = _jsonwebtoken2.default.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );

      return res.json({
        success: true,
        message: "Token gerado com sucesso.",
        data: {
          token: token,
          name: user.name,
          email: user.email,
          id: user.id,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error.errors.map((err) => err.message) });
    }
  }
}

// Exporting the instance of TokenController
// This allows us to use the same instance across the application
exports. default = new TokenController();

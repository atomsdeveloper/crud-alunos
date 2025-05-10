"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Students = require('../models/Students'); var _Students2 = _interopRequireDefault(_Students);

class PhotoController {
  async store(req, res) {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Nenhum arquivo enviado." });
    }

    try {
      const { student_id } = req.body;

      // Check if the student_id is provided in the request body
      if (!student_id) {
        return res.status(400).json({
          success: false,
          message: "O ID do aluno não foi fornecido.",
        });
      }

      // Check if the student_id exists in table "alunos"
      const studentExists = await _Students2.default.findOne({
        where: { id: student_id },
      });

      if (!studentExists) {
        return res.status(400).json({
          success: false,
          message: "O aluno não existe.",
        });
      }

      const isCloudinary = process.env.STORAGE_DRIVER === "cloudinary";

      // Get the filename and originalname from the request file
      const { filename, originalname, path } = req.file;

      const photo = await _Photo2.default.create({
        filename: isCloudinary ? path : filename, // `path` é a URL no Cloudinary
        originalname,
        student_id,
      });

      // Return a success response
      return res.json({
        success: true,
        message: "Rota acessada com sucesso.",
        file: photo,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao acessar a rota de upload.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : error.message,
      });
    }
  }
}

exports. default = new PhotoController();

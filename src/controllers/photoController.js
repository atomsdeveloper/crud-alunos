// Models
import Photo from "../models/Photo";
import Aluno from "../models/Aluno";

// Multer
import multer from "multer";
import multerConfig from "../config/multer";

// Multer middleware to handle file uploads
// The multerConfig is passed as an argument to the multer function
// The single method is used to specify that we are expecting a single file upload
const upload = multer(multerConfig).single("file");

class PhotoController {
  async store(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Erro ao processar o arquivo.",
        });
      }

      console.log(req.body);

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
        const studentExists = await Aluno.findOne({
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

        const photo = await Photo.create({
          filename: isCloudinary ? filename : path,
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
    });
  }
}

export default new PhotoController();

class PhotoController {
  async store(req, res) {
    try {
      // Check if the file is present in the request
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Nenhum arquivo enviado.",
        });
      }
      // Check if the file is an image
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "O arquivo enviado não é uma imagem.",
        });
      }
      // Check if the file size is less than 2MB
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "O arquivo enviado é maior que 2MB.",
        });
      }
      // Check if the file name is valid
      const fileName = req.file.originalname;
      const fileExtension = fileName.split(".").pop();
      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          success: false,
          message: "O arquivo enviado não é uma imagem válida.",
        });
      }
      // If all checks pass, return success response
      return res.json({
        success: true,
        message: "Rota acessada com sucesso.",
        file: req.file,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao acessar a rota de upload.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
}

// Exporting the instance of PhotoController
// This allows us to use the same instance across the application
export default new PhotoController();

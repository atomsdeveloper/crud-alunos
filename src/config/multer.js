import multer from "multer";
import { extname, resolve } from "path";

export default {
  // The storage option is used to specify where the uploaded files will be stored
  // The destination option is used to specify the directory where the files will be stored
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // The cb function is used to specify the directory where the files will be stored
      // The resolve function is used to create an absolute path to the directory
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        // Get the current date and time in milliseconds
        // by combining the current date and time with the original file name
        // and the file extension
        `${Date.now()}-${file.originalname}${extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  dest: "./uploads",
  // dest: path.resolve(__dirname, "..", "..", "uploads")
};

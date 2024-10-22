import multer from "multer";
import path from "path";
import fs from "fs";
import About from "../models/AboutMe.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const aboutDir = path.join(__dirname, '..', 'uploads', 'about');
    fs.mkdir(aboutDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return cb(err);
      }
      cb(null, aboutDir);
    });
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    console.log("ID recibido:", id);
    const fileName = id 
      ? `${id}${path.extname(file.originalname)}` 
      : `${Date.now()}${path.extname(file.originalname)}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

export const uploadAboutImage = async (req, res, next) => {
  const middleware = upload.single('image'); 
  const { id } = req.params;

  try {
    const existingAbout = await About.findById(id);
    if (existingAbout && existingAbout.imageUrl) {
      const newImagePath = path.join(
        __dirname, '..', 'uploads', 'about', 
        `${id}${path.extname(existingAbout.imageUrl)}`
      );
      if (fs.existsSync(newImagePath)) {
        console.log("Image will be overwritten.");
      }
    }
    
    middleware(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al subir la imagen', error: err.message });
      }
      next();
    });
  } catch (error) {
    console.error("Error al buscar los datos de About Me:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

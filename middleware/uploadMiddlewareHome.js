import multer from "multer";
import path from "path";
import fs from "fs";
import Home from "../models/Home.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileDir = path.join(__dirname, '..', 'uploads', 'profile');
    fs.mkdir(profileDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return cb(err);
      }
      cb(null, profileDir);
    });
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    console.log(id);
    console.log("hola");
    const fileName = id 
      ? `${id}${path.extname(file.originalname)}` 
      : `${Date.now()}${path.extname(file.originalname)}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

export const uploadMiddleware2 = async (req, res, next) => {
  const middleware = upload.single('image');
  const { id } = req.params;

  try {
    const existingSkill = await Home.findById(id);
    if (existingSkill && existingSkill.imageUrl) {
      const newImagePath = path.join(__dirname, '..', 'uploads', 'profile', `${id}${path.extname(existingSkill.imageUrl)}`);
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
    console.error("Error al buscar la habilidad:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

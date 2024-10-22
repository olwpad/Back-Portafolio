import multer from "multer";
import path from "path";
import fs from "fs";
import SkillModel from "../models/Skiills.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    console.log(id)
    const fileName = id 
      ? `${id}${path.extname(file.originalname)}` 
      : `${Date.now()}${path.extname(file.originalname)}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });
export const uploadMiddleware = async (req, res, next) => {
  const middleware = upload.single('image');
  const { id } = req.params;

  try {
    const existingSkill = await SkillModel.findById(id);
    if (existingSkill && existingSkill.imageUrl) {
      const oldImagePath = path.join(__dirname, '..', existingSkill.imageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen anterior:", err);
        }
      });
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

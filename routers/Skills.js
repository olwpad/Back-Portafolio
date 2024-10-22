import express from 'express';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';
import { createSkill, deleteSkill, getSkills ,updateSkill,getSkillsPaginated} from '../controllers/skillsController.js';
import { verificarToken } from '../middleware/validations.js';

const router = express.Router();

// Ruta para crear una habilidad
router.post('/skills', verificarToken, uploadMiddleware,createSkill );

// Ruta para obtener todas las habilidades
router.get('/skills', getSkills);

router.get('/skillsAdmin',verificarToken, getSkillsPaginated);

// Ruta para eliminar una habilidad
router.delete('/skills/:id',verificarToken, deleteSkill);

// Ruta para actualizar una habilidad
router.put('/skills/:id', uploadMiddleware, updateSkill);

export default router;

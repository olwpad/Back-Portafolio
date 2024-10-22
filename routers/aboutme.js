import express from 'express';
import { getAboutMe, updateAboutMe } from '../controllers/AboutmeController.js';
import { verificarToken } from '../middleware/validations.js';
import { uploadAboutImage } from '../middleware/uploadMiddlewareAboutMe.js';

const router = express.Router();

router.get('/aboutnme', verificarToken, getAboutMe);
router.put('/aboutnme/:id',  verificarToken, uploadAboutImage ,updateAboutMe);

export default router;

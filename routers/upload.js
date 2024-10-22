import express from 'express';
import { getImageByName ,getImageByNameAbout,getImageByNameHome,getImageByNamePublic,getImageByNamePublic2} from '../controllers/uploadImageController.js';
import { verificarToken } from '../middleware/validations.js';

const router = express.Router();

router.get('/:id',verificarToken, getImageByName);
router.get('/profile/:id',verificarToken, getImageByNameHome);
router.get('/aboutme/:id',verificarToken, getImageByNameAbout);
router.get('/public/:id', getImageByNamePublic);
export default router;

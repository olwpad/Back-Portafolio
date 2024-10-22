import express from 'express';
import { getHome, updateHome } from '../controllers/homeController.js';
import { verificarToken } from '../middleware/validations.js';
import { uploadMiddleware2 } from '../middleware/uploadMiddlewareHome.js';
;

const router = express.Router();

router.get('/homeData', verificarToken, getHome);
router.get('/homeData1', getHome);
router.put('/homeData/:id',  verificarToken, uploadMiddleware2 ,updateHome);

export default router;

import { Router } from "express";
import { Education,getEducation,deleteEducation,updateEducation,getEducation2 } from "../controllers/EducationController.js";
import { verificarToken } from "../middleware/validations.js";

const router = Router();
router.post("/education", verificarToken, Education);
router.get("/educationView", verificarToken, getEducation);
router.get("/educationView1", getEducation);
router.get("/educationView2", getEducation2);
router.delete("/education/:id", verificarToken, deleteEducation);
router.put("/education/:id", verificarToken, updateEducation);
export default router;

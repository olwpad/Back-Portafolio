import { Router } from "express";
import { verificarToken } from "../middleware/validations.js";
import { createProject, deleteProject, getProjects,getProjectsPaginated,updateProjects } from "../controllers/projectsController.js";

const router = Router();

// Rutas para Proyectos
router.post("/projects", verificarToken, createProject);
router.get("/projects", getProjects);
router.get("/projectsAdmin", verificarToken, getProjectsPaginated);
router.delete("/projects/:id", verificarToken, deleteProject);
router.put("/projects/:id", verificarToken, updateProjects);

export default router;

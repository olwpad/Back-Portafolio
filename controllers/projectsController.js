import projectsModel from "../models/Projects.js";

export const createProject = async (req, res) => {
    const { title, description, url, imageUrl } = req.body;
    console.log(req.body);
    try {
      const project = new projectsModel ({
        title,
        description,
        url,
        imageUrl,
      });
      const result = await project.save();
      return res.json({ message: "Proyecto registrado con éxito", result });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  // Obtener todos los proyectos
  export const getProjects = async (req, res) => {
    try {
      const result = await projectsModel.find();
      return res.json(result);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  // Obtener proyectos con paginación
  export const getProjectsPaginated = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit;
  
    try {
      const projects = await projectsModel.find().skip(skip).limit(parseInt(limit));
      const total = await projectsModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      return res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        projects,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  // Eliminar un proyecto
  export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
      await projectsModel.findByIdAndDelete(id);
      return res.json({ message: "Proyecto eliminado con éxito" });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };


  export const updateProjects = async (req, res) => {
    const { id } = req.params;
    const { title, url,imageUrl,description } = req.body;
    try {
        const result = await projectsModel
            .findByIdAndUpdate(id, {
                title,
                description,
                url,
                imageUrl,
            });
        return res.json({ message: "Projecto actualizado con éxito" });
    }
    catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
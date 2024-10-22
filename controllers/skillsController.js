import skillModel from "../models/Skiills.js";

// Crear una habilidad
export const createSkill = async (req, res) => {
  const { name, level, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const imageUrl2 = req.file ? `/uploads/public/${req.file.filename}` : null;
  try {
    const skill = new skillModel({ name, level, category, imageUrl, imageUrlPublic: imageUrl2 });
    const result = await skill.save();
    return res.json({ message: "Habilidad registrada con éxito", result });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener todas las habilidades
export const getSkills = async (req, res) => {
  try {
    const result = await skillModel.find();
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar una habilidad
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await skillModel.findByIdAndDelete(id);
    return res.json({ message: "Habilidad eliminada con éxito" });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar una habilidad
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL de la imagen si se sube

  try {
    const updatedData = { name, level, category };
    if (imageUrl) {
      updatedData.imageUrl = imageUrl;
    }

    await skillModel.findByIdAndUpdate(id, updatedData);
    return res.json({ message: "Habilidad actualizada con éxito" });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

  export const getSkillsPaginated = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit;
    try {
      const skillResp = await skillModel.find().skip(skip).limit(parseInt(limit));
      const total = await skillModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      return res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        skillResp,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

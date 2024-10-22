import educationModel from "../models/Education.js";

export const Education = async (req, res) => {
    const { title, date,city,description } = req.body;
    console.log(req.body);
    try {
        const education = new educationModel({
            title,
            date,
            city,
            description
        });
        const result = await education.save();
        return res.json({ message: "Educación registrada con éxito" });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

export const getEducation = async (req, res) => {
    try {
        const result = await educationModel.find();
        return res.json(result);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }  
 }

 
 export const getEducation2 = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit; 

    try {
        // Obtener los resultados con paginación
        const experiences = await educationModel.find()
            .skip(skip) // Omitir los documentos según la página
            .limit(parseInt(limit)); // Limitar la cantidad de resultados devueltos
        // Contar el total de documentos en la colección
        const total = await educationModel.countDocuments();
        // Calcular el total de páginas
        const totalPages = Math.ceil(total / limit); // Calcular el total de páginas
        // Enviar la respuesta con los resultados y metadatos de paginación
        return res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages, // Agregar total de páginas a la respuesta
            experiences,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

 export const deleteEducation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await educationModel.findByIdAndDelete(id);
        return res.json({ message: "Educación eliminada con éxito" });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateEducation = async (req, res) => {
    const { id } = req.params;
    const { title, date,city,description } = req.body;
    try {
        const result = await educationModel
            .findByIdAndUpdate(id, {
                title,
                date,
                city,
                description
            });
        return res.json({ message: "Educación actualizada con éxito" });
    }
    catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
import Home from "../models/Home.js";

export const getHome = async (req, res) => {
  try {
    const homeData = await Home.findOne();
    if (!homeData) {
      return res.status(404).json({ message: 'Home data not found' });
    }
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving home data', error });
  }
};

export const updateHome = async (req, res) => {
    const { id } = req.params;
    const imageUrl = req.file ? `/uploads/profile/${req.file.filename}` : null;
    const imageUrlPublic = req.file ? `/uploads/public/${req.file.filename}` : null;
    try {
        const updatedData = req.body;
        if (imageUrl) {
            updatedData.imageUrl = imageUrl;
        }
        if (imageUrlPublic) {
            updatedData.imageUrlPublic = imageUrlPublic;
        }

        // Actualiza el documento basado en el ID proporcionado
        const homeData = await Home.findByIdAndUpdate(
            id, // Usar el ID extraído del nombre del archivo
            updatedData, // Datos a actualizar
            { new: true, upsert: true, runValidators: true } // Opciones
        );

        if (!homeData) {
            return res.status(404).json({ message: 'Home not found' });
        }

        // Responde con los datos actualizados
        res.json(homeData);
    } catch (error) {
        console.error('Error al actualizar los datos de Home:', error);
        res.status(500).json({ message: 'Error updating home data', error });
    }
};

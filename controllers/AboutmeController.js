import About from "../models/AboutMe";
export const getAboutMe = async (req, res) => {
    console.log('getAboutMe');
    try {
        const aboutData = await About.findOne();
        if (!aboutData) {
            return res.status(404).json({ message: 'About Me data not found' });
        }
        res.json(aboutData);
    } catch (error) {
        console.error('Error al obtener los datos de About Me:', error);
        res.status(500).json({ message: 'Error retrieving About Me data', error });
    }
};

export const updateAboutMe = async (req, res) => {
    const { id } = req.params;
    const imageUrl = req.file ? `/uploads/profile/${req.file.filename}` : null;
    const imageUrlPublic = req.file ? `/uploads/public/${req.file.filename}` : null; 
    console.log('Image URL:', imageUrl);
    console.log('Public Image URL:', imageUrlPublic);

    try {
        const updatedData = req.body;
        if (imageUrl) {
            updatedData.imageUrl = imageUrl;
        }
        if (imageUrlPublic) {
            updatedData.imageUrlPublic = imageUrlPublic;
        }
        const aboutData = await About.findByIdAndUpdate(
            id, // Usamos el ID proporcionado
            updatedData, // Nuevos datos
            { new: true, upsert: true, runValidators: true } // Opciones de actualización
        );

        if (!aboutData) {
            return res.status(404).json({ message: 'About Me not found' });
        }
        res.json(aboutData); 
    } catch (error) {
        console.error('Error al actualizar los datos de About Me:', error);
        res.status(500).json({ message: 'Error updating About Me data', error });
    }
};

import { fileURLToPath } from 'url';
import path from 'path';
import skillModel from '../models/Skiills.js';
import About from '../models/AboutMe.js';
import Home from '../models/Home.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImageByName = async (req, res) => {
  const { id } = req.params;

  try {
    const skill = await skillModel.findById(id);

    if (!skill || !skill.imageUrl) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    const imagePath = path.join(__dirname, '..', skill.imageUrl);

    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        return res.status(500).json({ message: 'Error al enviar la imagen' });
      }
    });
  } catch (error) {
    console.error('Error al buscar la imagen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const getImageByNameHome = async (req, res) => {
  let { id } = req.params;
  try {
    const skill = await Home.findById(id);

    if (!skill || !skill.imageUrl) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    const imagePath = path.join(__dirname, '..', skill.imageUrl);
    console.log(imagePath);

    // Envía el archivo como respuesta
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        return res.status(500).json({ message: 'Error al enviar la imagen' });
      }
    });
  } catch (error) {
    console.error('Error al buscar la imagen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getImageByNamePublic = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero intentamos encontrar la imagen en skillModel
    let skill = await skillModel.findOne({ imageUrlPublic: `/uploads/public/${id}` });

    // Si no encontramos en skillModel, intentamos en homeModel
    if (!skill || !skill.imageUrlPublic) {
      skill = await Home.findOne({ imageUrlPublic: `/uploads/public/${id}` });
    }

    // Si aún no encontramos la imagen, devolvemos un 404
    if (!skill || !skill.imageUrlPublic) {
      return res.status(404).json({ message: 'Imagen pública no encontrada' });
    }

    // Si encontramos la imagen, enviamos el archivo
    const imagePath = path.join(__dirname, '..', skill.imageUrl);
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        return res.status(500).json({ message: 'Error al enviar la imagen' });
      }
    });
  } catch (error) {
    console.error('Error al buscar la imagen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
 }
export const getImageByNamePublic2 = async (req, res) => {
  const { id } = req.params;

  try {
    const skill = await Home.findOne({ imageUrlPublic: `/uploads/public/${id}` });
    if (!skill || !skill.imageUrlPublic) {
      return res.status(404).json({ message: 'Imagen pública no encontrada' });
    }

    const imagePath = path.join(__dirname, '..', skill.imageUrl);
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        return res.status(500).json({ message: 'Error al enviar la imagen' });
      }
    });
  } catch (error) {
    console.error('Error al buscar la imagen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }

};



export const getImageByNameAbout = async (req, res) => {
  const { id } = req.params;

  try {
    const aboutData = await About.findById(id);

    if (!aboutData || !aboutData.imageUrl) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    const imagePath = path.join(__dirname, '..', aboutData.imageUrl);
    console.log('Ruta de la imagen:', imagePath);
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        return res.status(500).json({ message: 'Error al enviar la imagen' });
      }
    });
  } catch (error) {
    console.error('Error al buscar la imagen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
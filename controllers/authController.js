import usuarioModel from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await usuarioModel.findOne({ usuario });
    if (!user) return res.status(401).json({ message: "Credenciales incorrectas" });
    const contraseñaValida = await bcrypt.compare(password, user.password);
    if (!contraseñaValida) return res.status(401).json({ message: "Credenciales incorrectas" });
    const token = jwt.sign({ usuarioId: user.usuario }, "tu_secreto_secreto", {
      expiresIn: "1d",
    });
    return res.json({
      message: "Inicio de sesión exitoso",
      token: token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const checkToken = async (req, res) => {
  return res.json({ message: "Token válido" });
};

export const logout = async (req, res) => {
  try {
    return res.json({ message: "Sesión cerrada con éxito" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

export const register = async (req, res) => {
  try {
    const { usuario, password, email } = req.body;

    const usuarioExistente = await usuarioModel.findOne({ usuario });
    const usuarioExistenteCorreo = await usuarioModel.findOne({ correo: email });

    if (usuarioExistente || usuarioExistenteCorreo) {
      return res.status(400).json({ message: "El usuario o correo ya está en uso" });
    }
    const contrasenaencriptada = await bcrypt.hash(password, 10);
    const data = new usuarioModel({
      usuario,
      password: contrasenaencriptada,
      correo: email,
    });

    const result = await data.save();
    return res.json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

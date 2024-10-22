import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
  usuario: String,
  nombres: String,
  password: String,
  correo: String,
});

const Usuario = model('Usuario', usuarioSchema);

export default Usuario;

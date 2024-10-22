import { Schema, model } from "mongoose";

const skillSchema = new Schema({
  name: String,
  level: String,
  category: String,
  imageUrl: String,
  imageUrlPublic: String,
});

const Skill = model('Skill', skillSchema);

export default Skill;

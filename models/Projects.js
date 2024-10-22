import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  url: String,
  imageUrl: String,
});

const Project = model('Project', projectSchema);

export default Project;

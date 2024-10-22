import { Schema, model } from "mongoose";

const educationSchema = new Schema({
  title: String,
  date: Date,
  description:String,
  city: String

});

const Education = model('Education', educationSchema);

export default Education;

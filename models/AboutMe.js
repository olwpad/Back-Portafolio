import { Schema, model } from "mongoose";

const aboutMeSchema = new Schema({
    description: String,
    imageUrl: String,
    imageUrlPublic: String,
});

const About = model('AboutMe', aboutMeSchema);

export default About;

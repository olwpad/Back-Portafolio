import { Schema, model } from "mongoose";

const homeSchema = new Schema({
  greeting: String,
  name: String,
  description: String,
  imageUrl: String,
  imageUrlPublic: String,
});

const Home = model('home',homeSchema );

export default Home;

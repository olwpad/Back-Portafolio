import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/auth.js";
import routerEducation from "./routers/Education.js";
import routerProjects from "./routers/proyectos.js";
import routerSkills from "./routers/Skills.js";
import routerUploads from "./routers/upload.js";
import routerHome from "./routers/Home.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["https://olwpad.netlify.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a MongoDB
const mongoString = process.env.MONGO_URI;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on("error", (error) => {
  console.error("Error connecting to database:", error);
});
database.once("connected", () => {
  console.log("Database connected");
});

// Rutas
app.use("/api", router);
app.use("/api", routerEducation);
app.use("/api", routerProjects);
app.use("/api/images/uploads", routerUploads);
app.use("/api", routerSkills);
app.use("/api", routerHome);

// Iniciar servidor
const port = process.env.PORT || 3300;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server started at ${port}`);
  console.log(`Go to http://${host}:${port}`);
});

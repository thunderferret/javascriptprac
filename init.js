import dotenv from "dotenv";
import "./db";
import app from "./app";
dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log("Listening on localhost 4000");

app.listen(PORT,handleListening);
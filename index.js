import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;


function handleListening(req){
   console.log("HOME");
}


app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());


app.use(morgan("dev"));
app.get("/",handleListening);


app.listen(PORT,handleListening);
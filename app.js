import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";




const app = express();
const PORT = 4000;


app.use(helmet());
app.set("view engine","pug");
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"));

app.use(localsMiddleware);
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;
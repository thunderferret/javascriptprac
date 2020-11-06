import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "passport"
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import session from "express-session";

dotenv.config();

import "./passport";


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


app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : true,
    saveUninitialized : false
}));
app.use(localsMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;

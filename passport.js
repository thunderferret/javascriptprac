import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy()); 

//serialization -> give info to cookie
//deSrialization -> how to find who is the User has Id no1

passport.use(
    new GithubStrategy({
        clientID : process.env.GH_ID,
        clientSecret : process.env.GH_SECRET,
        callbackURL : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
    )
)

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

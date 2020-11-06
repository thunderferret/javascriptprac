import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); 

//serialization -> give info to cookie
//deSrialization -> how to find who is the User has Id no1

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

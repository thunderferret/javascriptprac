import routes from "./routes";
import passport from "passport";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import GitHubStrategy from "passport-github2";



passport.use(User.createStrategy());
//serialization -> give info to cookie
//deSrialization -> how to find who is the User has Id no1

passport.use(
    new GitHubStrategy({
        clientID : process.env.GH_ID,
        clientSecret : process.env.GH_SECRET,
        callbackURL : `${routes.localSite}${routes.githubCallback}`
    },
    githubLoginCallback
    )
);

passport.serializeUser(
    function(user,done){
        done(null,user);
    }
);
passport.deserializeUser(
    function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    }
);
import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, postLogin, getLogin,logout, githubLogin,  postGithubLogin, githubLoginCallback } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";



const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, onlyPrivate,logout);
globalRouter.get(routes.search, search);


globalRouter.get(
    routes.githubCallback,
    passport.authenticate('github',
    {failureRedirect:routes.login}),
   function(req,res){
       res.redirect("/");
   } 
    
);
globalRouter.get(routes.github, githubLogin);
globalRouter.post(routes.github,postGithubLogin);
    

export default globalRouter;
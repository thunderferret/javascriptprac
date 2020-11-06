import routes from "../routes";
import User from "../models/User";
import passport from "passport";


export const getJoin = (req, res) => {
    res.render("join",{pageTitle:"Join"});
};

export const postJoin = async (req,res,next)=>{
    const {
        body : {name,email,password,password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join",{pageTitle:"Join"});
    }else{
        try{
        const user = await User.create({
            name : name,
            email : email
        });
        await User.register(user,password);
        next();
        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }    
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Log In" });
};

export const postLogin = passport.authenticate("local",{
        failureRedirect: routes.login,
        successRedirect: routes.home
})

export const logout = (req, res) => {
    //To Do : Profcess Log out
    res.redirect(routes.home);
};


export const userDetail = (req, res) => {
    res.render(routes.userDetail(),{pageTitle:"userDetail"});
}
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");


import passport from "passport";
import routes from "../routes";
import User from "../models/User";



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
        const user = await User({
            name : name,
            email : email,
            avatarUrl : null
        });
        await User.register(user,password);
        next();
        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }    
};

export const githubLogin = passport.authenticate("github",{failureRedirect:`${routes.login}`});


export const postGithubLogin =(req,res)=> res.redirect(routes.githubCallback); 


export const githubLoginCallback = async (_, __, profile, cb) =>{
    const { 
        _json : {id, avatar_url, name,email}
    } = profile;
    try{
        const user = await User.findOne({email});
        if(user){
            user.githubId = id;
            user.email = email;
            user.avatarUrl = avatar_url;
            user.save();
            return cb(null,user);
        }
        const newUser = await User.create({
                email : email,
                name : name,
                githubId: id,
                avatarUrl:avatar_url
            });
            return cb(null,newUser);
        
    }catch(err){
        return cb(error);
    }
};

export const me = (req,res) =>{
    if(req.user.avatarUrl == undefined) {req.user.avatarUrl="uploads/avatars/default.png";}
    res.render("userDetail",{pageTitle:"User Detail",user:req.user})
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Log In" });
};

export const postLogin = passport.authenticate("local",{
        failureRedirect: routes.login,
        successRedirect: routes.home
})

export const logout = (req, res) => {
    req.logout();
    req.loggedUser=req.user=res.user=res.loggedUser=null;
    res.redirect(routes.home);
};


export const userDetail = (req, res) => {
    res.render("userDetail",{pageTitle:"userDetail",user:req.user});
}


export const getEditProfile = (req, res) => {    
    res.render("editProfile",{pageTitle:"editProfile"});
};
export const postEditProfile = async (req, res) => {    
    const {
        body : { name, email},
        file
    } = req;
    try{
        const user = await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            avatarUrl : file ? file.path : req.user.avatarUrl
        });
       
        res.redirect(routes.home);
    }catch(error){
            res.render("editProfile",{pageTitle : "Edit Profile"})
        }
    
};

export const getChangePassword = (req, res) =>{
    res.render("changePassword",{pageTitle : "Change Password"});
}; 

export const postChangePassword = async (req,res)=>{
    const{
        body: {oldPassword, newPassword, newPassword1}
    } = req;
    try{
        if(newPassword != newPassword1){
            res.status(400);
            res.redirect(`${routes.changePassword}`);
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(`${routes.home}`);
        }catch(error){
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
    };


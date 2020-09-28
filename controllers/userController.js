import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join",{pageTitle:"Join"});
};

export const postJoin = (req,res)=>{
    const {
        body : {name,email,password,password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join",{pageTitle:"Join"});
    }else{
        //To Do : Register User
        //TO DO : Log user in
        res.redirect(routes.home);
    }
    
};
export const getLogin = (req, res) => {
    res.render("login");
};
export const postLogin = (req, res) => {
    console.log(req.body);
    res.render("login",{pageTitle : "Login"});
};

export const logout = (req, res) => {
    //To Do : Profcess Log out
    res.redirect(routes.home);
};


export const userDetail = (req, res) => {
    res.render(routes.userDetail(),{pageTitle:"userDetail"});
}
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
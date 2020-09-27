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
export const login = (req, res) => res.render("login");
export const logout = (req, res) => res.render("logout");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
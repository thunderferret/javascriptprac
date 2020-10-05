import routes from "../routes";
import Video from "../models/Video";

export const home = async(req, res) =>{
    const videos = await Video.find({});
    try{
    res.render("home", {pageTitle : "Home",videos});
    } catch(error){
        console.log(error);
        res.render("home",{pageTitle:"Home",videos:[]});
    }

};

export const search = (req, res) => {
    const {
        query:{term}
    } = req;// focus!
    const searchingBy = req.query.term;
    res.render("search",{
        pageTitle : "Search",
        searchingBy : searchingBy,
        videos
    });
}

export const getUpload = (req, res) => {
    res.render("upload",{pageTitle:"upload"});
};
export const postUpload = async(req, res) => {
    const{
        body : { title, description},
        file : {path}
    }=req;
    // To do : upload and save video
    console.log(req);
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async(req, res) => {
    const {
        params: { id }
    } = req;
    try{
    const video = await Video.findById(id);
    res.render("videoDetail",{
        pageTitle:"VideoDetail",video});
    }catch(error){
        console.log("Error");
        res.redirect(routes.home);
    }
   
}
export const getEditVideo = async(req, res) =>{
    const {
        params : {id}
    } = req;

    try{
        const video = await Video.findById(id);
        res.render("editvideo",{pageTitle:`edit ${video.title}`,video})
    }catch(error){
        res.redirect(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
    const {
        params : { id } ,
        body : {title, description}
    } = req;

    console.log(id);
    try{
        await Video.findOneAndUpdate({id},{title,description});
        
        res.redirect(routes.videoDetail(id));

    }catch(error){
        res.redirect(routes.home);
    }
};


export const deleteVideo = (req, res) => res.render("deleteVideo");
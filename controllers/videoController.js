import routes from "../routes";
import Video from "../models/Video";

export const home = async(req, res) =>{
    const videos = await Video.find({}).sort({_id : -1});
    try{
    res.render("home", {pageTitle : "Home",videos});
    } catch(error){
        console.log(error);
        res.render("home",{pageTitle:"Home",videos:[]});
    }
};

export const search = async(req, res) => {
    const {
        query:{term}
    } = req;// focus!
    let videos = [];

    const searchingBy = req.query.term;
    try {
        videos = await Video.find({title : {$regex: searchingBy, $options:"i"}});
    } catch (error) {
        console.log(error);
    }
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
    try{
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator : req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
}catch(error){
    console.log(error);
}
}

export const videoDetail = async(req, res) => {
    const {
        params : {id}
    }=req;
    try{
    const video = await Video.findById(id).populate("creator");
    console.log(video);
    res.render("videoDetail",{pageTitle:"VideoDetail",video,loggedUser : req.user});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
   
}
export const getEditVideo = async(req, res) =>{
    const {
        params : {id}
    } = req;

    try{
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        }
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
    try{
        await Video.findOneAndUpdate({_id:id},{title,description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
};


export const deleteVideo = async(req, res) => {
    const {
        params : {id}
    } = req;
    try{
        if(video.creator !== req.user.id){
            throw Error();
        }
        await Video.findOneAndDelete({ _id : id });
    }catch(error){
        console.error(error);
    }
    res.redirect(routes.home);
}

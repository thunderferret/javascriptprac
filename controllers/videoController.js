import routes from "../routes";

export const home = (req, res) =>{
    res.render("home", {pageTitle : "Home",videos});
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
    res.render("upload")
};
export const postUpload = (req, res) => {
    const{
        body:{file,title,description}
    }=req;
    // To do : upload and save video
    res.redirect(routes.videoDetail(324393));
}

export const videoDetail = (req, res) => {
    res.render("videoDetail",{pageTitle:"VideoDetail"});
}
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");
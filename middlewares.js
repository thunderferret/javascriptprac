import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId : process.env.AWS_KEY,
  secretAccessKey : process.env.AWS_PRIVATE_KEY
});

const multerVideo = multer({
  storage : multerS3({
    s3,
    acl:"public-read",
    bucket:"thunderferret"
  })
})

//const multerVideo = multer({dest:"uploads/videos/"});
//const multerAvatar = multer({dest:"uploads/avatars/"});

const multerAvatar = multer({
  storage : multerS3({
    s3,
    acl:"public-read",
    bucket:"thunderferret"
  })
})


export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "G.I.V.E. TUBE";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req,res,next)=>{
  if(req.user){
    res.redirect(routes.home);
  }else{
    next();
  }
}

export const onlyPrivate = (req,res,next) =>{
  if(req.user){
    next();
  }else{
    res.redirect(routes.home);
  }
}


export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
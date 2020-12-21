//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const LOCALSITE = `http://localhost:${process.env.PORT}`

// Users

const USERS = "/users";
const CHANGE_PASSWORD = "/change-password";
const ME="/me";
const USER_DETAIL="/:id";
const DEFAULT_IMAGE="uploads/avatars/default.png";
const EDIT_PROFILE = "/:id/edit-profile";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const VIDEO_DETAIL = "/:id";

const GITHUB = "/auth/github"; 
const GITHUB_CALLBACK = "/auth/github/callback";


const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) =>{
    if(id){
      return `/users/${id}`;
    }else
    {
      return  USER_DETAIL;
    }
  },
  editProfile : (id) =>{
    if(id){
      return `/users/${id}/edit-profile`;
    }else
    {
      return  EDIT_PROFILE;
    }
  },
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  
  videoDetail: (id) =>{
    if(id){
      return `/videos/${id}`
    }else{
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id)=>
  {
    if(id){
      return `/videos/${id}/edit`;
    }else{
      return EDIT_VIDEO;
    };
  },
  deleteVideo: (id)=>{
    if(id){
      return `/videos/${id}/delete`;
    }else{
      return DELETE_VIDEO;
    }
  },
  github : GITHUB,
  githubCallback : GITHUB_CALLBACK,
  localSite : LOCALSITE,
  me : ME,
  defaultImage:DEFAULT_IMAGE
};

export default routes;
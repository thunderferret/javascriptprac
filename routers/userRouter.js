import express from "express";
import routes from "../routes";
import {  getEditProfile, getChangePassword,postChangePassword ,me, postEditProfile, getUserDetail } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.changePassword,getChangePassword);
userRouter.post(routes.changePassword,postChangePassword);

userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile(),uploadAvatar ,postEditProfile);


userRouter.get(routes.me ,onlyPrivate , me);

userRouter.get(routes.userDetail(),getUserDetail);


export default userRouter;
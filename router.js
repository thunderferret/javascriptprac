import express from "express";

export const userRouter = express.Router();

userRouter.get("/",(req,res) => res.send('User index Home'));
userRouter.get("/edit",(req,res)=> res.send("profile /user/edit user"));
userRouter.get("/password",(req,res)=> res.send("PAssword Shit"));

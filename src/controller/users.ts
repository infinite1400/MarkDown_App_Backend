import express from 'express'
import userModel from '../db/users';
import { authentication } from '../helpers/authenticationHelper';
export const allUsers=async(req : express.Request , res : express.Response)=>{
    try{
      const users=await userModel.find();
      return res.status(200).json(users).end();
    }catch(error){
      console.log(error);
      return res.sendStatus(403);
    }
}

export const updateUser=async(req : express.Request,res : express.Response)=>{
    try{
      const {id}=req.params;
      const {email,username,password}=req.body;
      const user=await userModel.findById(id).select('+authentication.password +authentication.salt');
  
      if(email){
        user.email=email;
      }
      if(username){
        user.username=username;
      }
      if(password){
        user.authentication.password=authentication(user.authentication.salt as string,password);
      }
  
      await user.save();
      return res.status(200).json(user).end();
    }catch(error){
      console.log(error);
      return res.sendStatus(403);
    }
  }
  
   export const deleteUser=async(req : express.Request,res : express.Response)=>{
    try{
      const {id}=req.params;
      const user=await userModel.findByIdAndDelete(id);
      return res.status(200).json(user).end()
    }catch(error){
      console.log(error);
      return res.sendStatus(403);
    }
  }
  
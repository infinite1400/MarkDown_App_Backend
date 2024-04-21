import express from "express";
import userModel, { findByEmail, findByUsername } from "../db/users";
import { authentication, random } from "../helpers/authenticationHelper";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      console.log("All Fields are Mandatory !");
      return res.status(403).json("Please Fill All the fields");
    }
    const existing_email_user = await findByEmail(email);

    if (existing_email_user) {
      return res.status(403).json("Email already exist ! Please login...");
    }

    const existing_email_username = await findByUsername(username);

    if (existing_email_username) {
      return res.status(403).json("Username already exist ! Try Different...");
    }

    const salt = random();
    const user = new userModel({
      username: username,
      email: email,
      authentication: {
        salt: salt,
        password: authentication(salt, password),
      },
    });

    await user.save().then((user) => user.toObject());
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login=async(req : express.Request,res : express.Response)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(403).json("All Fields are Mandatory ! ");
    }

    const existing_user= await findByEmail(email).select('+authentication.salt +authentication.password');

    if(!existing_user){
      return res.status(403).json('User does not exists! Please Register');
    }

    const expectedHash=authentication(existing_user.authentication.salt as string,password);
    if(expectedHash!=existing_user.authentication.password){
      return res.status(403).json("Password is Wrong ! Enter Correct password !");
    }

    const salt=random();
    existing_user.authentication.sessionToken=authentication(salt,existing_user._id.toString());
    await existing_user.save();

    res.cookie('MARKDOWN-AUTH',existing_user.authentication.sessionToken,{domain : 'localhost' , path : '/'});
    return res.status(200).json(existing_user).end();

  }catch(error){
    console.log(error);
    return res.sendStatus(403);
  }
}
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

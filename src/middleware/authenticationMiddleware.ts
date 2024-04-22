import { findBySessionToken } from "db/users";
import express from "express";

export const authenticated=async(req : express.Request , res : express.Response , next : express.NextFunction)=>{
    try{
        const sessionToken=req.cookies["MARKDOWN-AUTH"];

        if(!sessionToken){
            return res.send(403).json(" sessionToken is not there !");
        }

        const user=await findBySessionToken(sessionToken);

        if(!user){
            return res.send(403).json("No User exist for this session Token !");
        }
        
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}
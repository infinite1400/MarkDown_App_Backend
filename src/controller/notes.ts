import express from 'express';
import noteModel from '../db/notes';
const addNote=async(req : express.Request , res : express.Response)=>{
    try{
        
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}
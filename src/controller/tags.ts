import { deleteTagById, findTagById, tagModel } from '../db/notes';
import express from 'express';
import {v4 as uuidv4} from 'uuid';
export const addTag=async(req : express.Request,res :express.Response)=>{
    try{
        const {label}=req.body;
        if(!label){
            return res.status(403).json("Label is required !");
        }
        const tag=new tagModel({
            id : uuidv4(),
            label : label
        });
        await tag.save();
        return res.status(200).json(tag).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}

export const listTags=async(req : express.Request,res :express.Response)=>{
    try{
        const tags=await tagModel.find();
        return res.status(200).json(tags).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}

export const updateTag=async(req : express.Request,res :express.Response)=>{
    try{
        const {id}=req.params;
        const {label}=req.body;

        const tag=await findTagById(id);

        if(!tag){
            return res.status(403).json("tag didn't exists ! ");
        }

        if(label) tag.label=label;
        await tag.save();
        return res.status(200).json(tag);
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}

export const deleteTag=async(req : express.Request,res :express.Response)=>{
    try{
        const {id}=req.params;
        const tag=await deleteTagById(id);
        if(!tag){
            return res.status(403).json("tag didn't exists ! ");
        }
        return res.status(200).json(tag);
    }catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}
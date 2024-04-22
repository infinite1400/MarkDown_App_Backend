import express from 'express'
import noteModel, { tagModel } from '../db/notes'

const note=new noteModel({
    id : "1234",
    title : "sample note",
    markdown : "This is a sample note",
    tagIds : ["h1","h2"],
});
console.log(note);

const tag=new tagModel({
    id : "1234",
    label : "sample"
});
console.log(tag);

export default (router : express.Router) => {
    router.get("/note",(req : express.Request , res : express.Response)=>{
        res.send("This is the sample note check route !");
    })
}
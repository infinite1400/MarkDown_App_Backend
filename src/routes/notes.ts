import express from 'express'
import noteModel, { tagModel } from '../db/notes'
import { addNote, deleteNote, listNotes, updateNote } from '../controller/notes';

export default (router : express.Router) => {
    router.get("/note",(req : express.Request , res : express.Response)=>{
        res.send("This is the sample note check route !");
    })
    router.post("/addnote",addNote);
    router.get("/notes",listNotes);
    router.patch("/note/:id",updateNote);
    router.delete("/note/:id",deleteNote);
}
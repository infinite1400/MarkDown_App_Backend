import { register } from '../controller/authentication';
import express from 'express'

export default (router : express.Router) =>{
    router.get('/check',(req : express.Request , res : express.Response)=>{
        res.send("checking route in authentication.ts");
    })
    router.post('/auth/register',register);
}
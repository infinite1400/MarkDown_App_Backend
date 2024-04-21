import { allUsers, deleteUser, login, register, updateUser } from '../controller/authentication';
import express from 'express'

export default (router : express.Router) =>{
    router.get('/check',(req : express.Request , res : express.Response)=>{
        res.send("checking route in authentication.ts");
    })
    router.post('/auth/register',register);
    router.post('/auth/login',login)
    router.get('/users',allUsers);
    router.patch('/users/:id',updateUser)
    router.delete('/users/:id',deleteUser)

}
import { addTag, deleteTag, listTags, updateTag } from '../controller/tags'
import express from 'express'

export default (router : express.Router) => {
    router.post("/addtag",addTag);
    router.get("/tags",listTags);
    router.patch("/tag/:id",updateTag);
    router.delete("/tag/:id",deleteTag);
}
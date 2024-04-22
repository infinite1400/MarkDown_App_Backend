import express from 'express';
import authentication from './authentication';
import notes from './notes';
import tags from './tags';
const router=express.Router();

export default () : express.Router => {
    authentication(router);
    notes(router);
    tags(router);
    return router;
}
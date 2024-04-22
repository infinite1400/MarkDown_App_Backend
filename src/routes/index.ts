import express from 'express';
import authentication from './authentication';
import notes from './notes';
const router=express.Router();

export default () : express.Router => {
    authentication(router);
    notes(router);
    return router;
}
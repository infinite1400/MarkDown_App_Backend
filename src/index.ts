import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from '../src/connection/db';
dbConnect();
const app=express();

app.use(cors({
    credentials : true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server=http.createServer(app);
const PORT=process.env.PORT || 8080;
server.listen(PORT,()=>{
    console.log(`Server is running on http/:localhost:${PORT}`)
})
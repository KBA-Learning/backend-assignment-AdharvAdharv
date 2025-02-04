import express from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import adminauth from './Routes/adminauth.js';

const app=express();
dotenv.config();

app.use(express.json())

app.use('/',userauth)
app.use('/',adminauth)

app.listen(process.env.PORT,function(){
    console.log(`Service is listening at ${process.env.PORT}`);
    
})


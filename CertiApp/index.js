import express, { json } from 'express';
import dotenv from 'dotenv';
import userauth from './Routes/C__userauth.js';
import adminauth from './Routes/C__adminauth.js';


dotenv.config();

const library =express();
library.use(json())

library.use('/',userauth);
library.use('/',adminauth);


library.listen(process.env.PORT,function(){
    console.log(`Service is listening at  ${process.env.PORT}`);
});
    

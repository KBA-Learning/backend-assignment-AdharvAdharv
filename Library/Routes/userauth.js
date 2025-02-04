import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userauth=Router();
const user=new Map();


userauth.post('/signup',async(req,res)=>{
    try{
        
        const {FirstName,LastName,UserName,Password,UserRole}=req.body;
        
         
         if(user.get(UserName)){
            res.status(401).send('User Name already exist');
            console.log('User Name already exist');
            
         }else{
            const NewPassword= await bcrypt.hash(Password,10);  //encrypting password
            user.set (UserName,{FirstName,LastName,Password:NewPassword,UserRole})   //storing into map ---key value is username

             console.log('---------sign up----------');
             res.status(201).send('signed up')
            }
        console.log(user);
        
    }
    catch{
        res.status(500).send('Internal Server Error')
    }
})

// login page

userauth.post('/login',async(req,res)=>{
    try{
        console.log('------LogIn Page ------');
        const {UserName,Password}=req.body;
        const result=user.get(UserName);

         if(!result){
            res.status(400).send('Enter valid Username')
         }else{
            console.log(result.Password);
            const valid= await bcrypt.compare(Password,result.Password);    //comparing login password and sign up password
            console.log(valid);
            

             if(valid){
                const token=jwt.sign({UserName:UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'})
                console.log(token);
                res.cookie('authToken',token,
                    {
                        httpOnly:true
                    });

                    res.status(200).send('Logged in Successfully')
                    console.log('Logged in Successfully');
                    
                   
                    
                
             }else{
                res.status(401).send('Unauthorised Access')
             }
            
         }          
        }

    catch{
        res.status(500).send('Internal Server Error')
    }
    
})




export { userauth};

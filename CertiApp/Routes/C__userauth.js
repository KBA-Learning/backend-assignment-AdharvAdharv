import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userauth=Router()
const user=new Map();

userauth.post('/signup',async (req,res)=>{
   

try{
    
    const {Fname,Lname,UserName,Role,Password}= req.body
   
    
    if(user.get(UserName)){
        console.log("User Name Already exist");
        res.status(401).json({message:'User Name already exist'})
        
    }else{
        const NewPassword= await bcrypt.hash(Password,10)
        user.set(UserName,{Fname,Lname,Role,Password:NewPassword});
       
        console.log('----Sign up page----');
        res.status(201).send('Sign Up')
        console.log(user);
        

    }
    
    }
    catch{
        res.status(500).send('Internal server error');
    }
});

userauth.post('/login',async(req,res)=>{
    try{
        console.log('====== Login Page ======');
        const {UserName,Password}=req.body;
        const result = user.get(UserName);

        if(!result){
            res.status(400).send('Enter valid Username');
            console.log('Enter valid Username');
            
        }else{
            const valid = await bcrypt.compare(Password,result.Password)
            console.log(` Password is ${valid}`);
        
         if(valid){
            
            
            const token=jwt.sign({UserName:UserName,Role:result.Role},process.env.SECRET_KEY,{expiresIn:'1h'});
            console.log(token);
            res.cookie('authtoken',token,
                {
                    httpOnly:true
                });

                res.status(200).send('Logged in successfully');
                console.log('Logged in successfully');
                
            

         }  else{
            res.status(401).send('Unauthorised Access');
            console.log('Unauthorised Access');
            
         } 
            
        }   
        

    }catch{
        res.status(500).send('Internal Server Error')
    }
    
})



export default userauth

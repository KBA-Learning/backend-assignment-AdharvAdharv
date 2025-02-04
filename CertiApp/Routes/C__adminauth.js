import { Router } from "express";
import Authenticate from "../Middleware.js/auth.js";
import AdminCheck from "../Middleware.js/Admincheck.js";

const adminauth=Router();
const certi=new Map();
adminauth.post('/addcertificate',Authenticate,AdminCheck,(req,res)=>{
     try{
        const {Course,CertificateId,CandidateName,Grade,IssueDate}=req.body;
        console.log(CertificateId);
        
        console.log('-----Add Certificate-----');
        
        if(certi.get(CertificateId)){
         
         console.log('Certificate ID already exist');
         res.status(400).send('Certificate ID already exist')
         
        }else{
         
         
         certi.set(CertificateId,{Course,CandidateName,Grade,IssueDate})
         res.status(201).send('Certificate Added');
         console.log('Certificate Added');
        
         
         
        }
 
     }catch{
        res.status(500).send("Internal Server error")
     }
    
})

adminauth.get('/ShowCertificate',(req,res)=>{
   try{
      console.log('----Show Certificate----');
      
       const CID=req.query.CertificateId 
       console.log(CID);
       const result=certi.get(CID)
      
       
      
       if(result){
         console.log(certi.get( CID ));
         res.status(200).send(result)
         

       }else{
         console.log('Invalid Certificate ID');
         res.status(404).send('Invalid Certificate ID')
         
       }

   }catch{
       res.status(500).send('Internal Server error')
   }
   
})

adminauth.get('/logout',(req,res)=>{

      res.clearCookie('authtoken')
      
      res.status(200).send('Logged out Successfully')
      console.log('Logged out Successfully');
      

})

export default adminauth;
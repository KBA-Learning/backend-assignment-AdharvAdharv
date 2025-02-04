import { Router } from "express";
import { authenticate } from "../Middleware/auth.js";



const adminauth=Router();
const books=new Map();


adminauth.post('/addbook',authenticate,(req,res)=>{
    console.log("add book page");

    try{
        if(req.role == 'admin'){
            const {BookName,AuthorName,Genre,Description,Price}=req.body;

              if(books.get(BookName)){
                res.status(400).send('Book already saved') 
                console.log('Book Name already exist');
                
              }else{
                books.set(BookName,{AuthorName,Genre,Description,Price})
                res.status(201).send('Book Added')
                console.log('Book Added');
              }

        }else{
            res.status(403).send('You are not allowed to do this')
        }

    }catch{
        res.status(500).send('Internal server Error')
    }
    
})


adminauth.get('/showBook',authenticate,(req,res)=>{
  try{
    console.log('-----Show Book Page----');
    
    const book1=req.query.BookName;
    const result=books.get(book1);
    

    if(result){
      res.status(200).send(books.get(book1));
      console.log(result);
      

    }else{
      console.log('Book not found');
      res.status(404).send('Book not found');
      
    }
    
    
  }catch{
    res.status(500).send('Internal Server Error')
  }
})

adminauth.get('/logout',(req,res)=>{

  res.clearCookie('authToken')
  res.status(200).send('Successfully Logged out')
  console.log('Successfully Logged out');
  
})



export default adminauth;
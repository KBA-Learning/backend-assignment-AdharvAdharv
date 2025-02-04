import jwt from 'jsonwebtoken';

function Authenticate(req,res,next){
    
    const cookie=req.headers.cookie;
    // console.log(cookie);
    

    if(cookie){
        const [name,token]=cookie.trim().split('=');
        console.log(name);
        console.log(token);
        
        if(name =='authtoken'){
            const varified=jwt.verify(token,process.env.SECRET_KEY);
            console.log(varified);

            req.user=varified.UserName;
            req.role=varified.Role
            next();
        }else{
            res.status(401).send('Unauthorised Status')
        }
    }
    else{
        console.log('Unauthorised status');
        res.status(401).send('Unauthorised Status')
        
    }
    
}
export default Authenticate;
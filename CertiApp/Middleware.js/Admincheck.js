function AdminCheck(req,res,next){
    if (req.role == "admin"){
        console.log('Admin is the user');
        
        next();
    }else{
        console.log('You are not allowed to do this');
        res.status(400).send('You are not allowed to do this')
        
    }
}
export default AdminCheck;
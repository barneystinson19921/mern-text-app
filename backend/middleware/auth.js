const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('Authorization');

    if(!token){
        return res.status(401).json({message:'Authorisation denied mate you dont have the key'});
    }
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded.userId;
        next();
    }catch(error){
        res.status(401).json({message:"Token seems to be unvalied..dude.."});
    }
};
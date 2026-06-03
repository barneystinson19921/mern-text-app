const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// REGISTER ROUTE

router.post('/register',async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const userExists=await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message:'Email already exists mate..'});
            
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            password:hashedPassword
        });

        await newUser.save();
        res.status(201).json({message:'User registered successfully!!!!🏃‍♀️'});

    }catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
});


// LOGIN ROUTE

router.post('/login',async(req,res)=>{
try{
    const{email,password}=req.body;

    const user= await  User.findOne({email});
    
    if (!user) {
        return res.status(400).json({message:'The account doesnt exist dude!!!'});
    }

    const isMatch= await bcrypt.compare(password,user.password);

    if (!isMatch) {
        return res.status(400).json({message:"The Password is incorrect mate!!!"});
    }

   
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );

     res.status(200).json({message:"login successful🐱‍🐉",
        token:token
    });
    
     } catch(error)
    {
    res.status(500).json({message:`server not working`,error:error.message});
    }

});

module.exports=router;


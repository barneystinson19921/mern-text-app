const express=require('express');
const router=express.Router();
const Post=require('../models/Post');
const auth= require('../middleware/auth');

// CREATING POST

router.post('/',auth,async(req,res)=>{
    try{
        const newPost=new Post({
            user:req.user,
            text:req.body.text
        });

        const savedPost= await newPost.save();
        res.status(201).json(savedPost);

    }catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
});

// GET POST

router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find()
        .populate('user','name')
        .sort({createdAt:-1});
        res.status(200).json(posts);

    }catch(error)
    {
        res.status(500).json({message:"server error",error:error.message});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.json({message:"Post Deleted Successfully!"});
    }catch(error){
        res.status(500).json({message:"server error during deletion."});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const updatedPost= await Post.findByIdAndUpdate(req.params.id,
        {text:req.body.text},
        {new:true}
    );
        res.json({message:"Post Updated Successfully!"});
    }catch(error){
        res.status(500).json({message:"server error during updation."});
    }
});

module.exports=router;
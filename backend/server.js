require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');


const app=express();
const PORT=process.env.PORT||5000;

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/posts',require('./routes/posts'));

// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("database connected successfully🚀"))
    .catch((error)=>console.log('moron the database connection failed.❌',error));



app.get('/',(req,res)=>{
    res.send(`server is running in ${PORT}`);
});

app.listen(PORT,()=>{
    console.log(`server on ${PORT}`);
}); 
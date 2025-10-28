import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app=express();
dotenv.config();
const PORT=8000;

app.get('/',(req,res)=>{
    res.status(201).json({
        "message":"Welcome to the Get request!"
    })
})  

app.listen(PORT,async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected Successfully!!`)
    }
    catch(error){

    }
    console.log(`Server is running at ${PORT}`);
})
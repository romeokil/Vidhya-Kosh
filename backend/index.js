import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './routes/UserRoute.js';
import courseRoute from './routes/courseRoute.js';
import instructorRoute from './routes/instructorRoute.js'
import enrolledcourseRoute from './routes/enrolledcourseRoute.js'

const app=express();
dotenv.config();
const PORT=8000;
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(201).json({
        "message":"Welcome to the Get request!"
    })
})  

app.use('/api/user',userRoute);
app.use('/api/course',courseRoute);
app.use('/api/instructor',instructorRoute);
app.use('/api/enrolledcourse',enrolledcourseRoute);

app.listen(PORT,async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected Successfully!!`)
    }
    catch(error){
        console.log('Error while connecting to database')
    }
    console.log(`Server is running at ${PORT}`);
})
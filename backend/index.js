import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoute from './routes/UserRoute.js';
import courseRoute from './routes/courseRoute.js';
import instructorRoute from './routes/instructorRoute.js';
import enrolledcourseRoute from './routes/enrolledcourseRoute.js';
import adminRoute from './routes/adminRoute.js';

import { ingestCourses } from './chatbot/ingestCourse.js';
import { searchCourses } from './chatbot/testsearchCourse.js';
import { detectIntent } from './utils/intentDetection.js';

// environment laod kro pehle.
dotenv.config();

const app = express();
const PORT = 8000;

// check ki course ingestion complete hua ki ni.
let isIngestionComplete = false;

// middleware.
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// just to check our app server is running or not.
app.get('/', (req, res) => {
    res.status(201).json({
        message: "Server is running 🚀"
    });
});

// ingestion route api/chatbot wala.

app.post('/api/chatbot', async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({
            message: "Message should not be empty"
        });
    }
    const intent = detectIntent(message);
    try {
        // agr intent greeting ka hua toh.
        if (intent === "greeting") {
            return res.json({
                reply: "Hello 👋 I can help you find the best courses. Ask me something like 'Recommend me a React course'."
            });

        }
        //agr course wala intent hua toh.
        else if (intent === "course") {
            if (!isIngestionComplete) {
                return res.status(503).json({
                    message: "System is initializing. Please try again in a moment."
                });
            }

            const courses = await searchCourses(message);

            return res.json({
                reply: courses
            });
        }
        // agr kuch general way me puch rha hai toh.
        else if (intent === "general") {
            return res.json({
                reply: "I'm here to help with course recommendations. Ask me about learning topics like React, AI, Web Development etc."
            });
        }
    }
    catch (error) {

    }
    try {
        const reply = await searchCourses(message);
        res.status(200).json({ reply });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Chatbot failed" });
    }
});

app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);
app.use('/api/instructor', instructorRoute);
app.use('/api/enrolledcourse', enrolledcourseRoute);
app.use('/api/admin', adminRoute)


async function startServer() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Database connected successfully");

        console.log("Starting course ingestion into Pinecone...");
        await ingestCourses();
        console.log("✅ Course ingestion completed");

        // ingestion completed mark kr diye.
        isIngestionComplete = true;

        // ingestion complete krne ke baad server start kr rhe hai.
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log("Chatbot is ready to accept requests");
        });

    } catch (error) {
        console.error("Startup failed:", error);
        process.exit(1); // startup fail ho gy toh exit kr lena.
    }
}

// start everything.
startServer();

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "../models/Course.js";
import { syncCourseToVectorDB } from "../services/syncCourse.js";

export async function ingestCourses() {
  try {
    console.log("🚀 Starting ingestion...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected just to ensure course table is active otherwise, how can we create embeddings all");

    const courses = await Course.find();
    console.log(`📚 Found ${courses.length} courses`);

    for (const course of courses) {
      await syncCourseToVectorDB(course);
    }

    console.log("🎉 All courses synced to Pinecone");
  } catch (error) {
    console.error(error);
  }
}

import { index } from "../config/pinecone.js";
import { createEmbedding } from "../utils/createEmbeddings.js";
import { courseToText } from "../utils/coursetoText.js"

export async function syncCourseToVectorDB(course) {
  try {
    const text = courseToText(course);
    const embedding = await createEmbedding(text);

    await index.upsert([
      {
        id: course._id.toString(),
        values: embedding,
        metadata: {
          name: course?.name,
          description:course?.description,
          author: course?.author,
          price: course?.price,
          rating: course?.rating,
        },
      },
    ]);

    console.log(`✅ Synced: ${course.name}`);
  } catch (error) {
    console.error("❌ Error syncing course:", error.message);
  }
}
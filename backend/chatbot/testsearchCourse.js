import { index } from "../config/pinecone.js";
import { createEmbedding } from "../utils/createEmbeddings.js";

export async function searchCourses(query) {
  const embedding = await createEmbedding(query);

  const results = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });
  console.log("🔎 Results:");
  const recommendedcourse=results.matches.map(result=>result.metadata.name)
  console.log(recommendedcourse);
  return recommendedcourse;
}

import { pipeline } from "@xenova/transformers";

let extractor;

// Load model once (important for performance)
async function loadModel() {
  if (!extractor) {
    console.log("🔄 Loading embedding model...");
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    console.log("✅ Model loaded");
  }
}

export async function createEmbedding(text) {
  await loadModel();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data); // 384-d vector
}
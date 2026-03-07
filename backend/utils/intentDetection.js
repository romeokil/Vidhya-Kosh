export function detectIntent(message) {
  const text = message.toLowerCase();

  const courseKeywords = [
    "course",
    "learn",
    "recommend",
    "suggest",
    "training",
    "study",
    "programming",
    "javascript",
    "react",
    "node",
    "ai",
    "machine learning",
    "web development"
  ];

  const greetingKeywords = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good evening"
  ];

  // greeting detect kr lega agr enme se koi word hua toh.
  if (greetingKeywords.some(word => text.includes(word))) {
    return "greeting";
  }

  // course detect kr lega agr enme se koi word hua toh.
  if (courseKeywords.some(word => text.includes(word))) {
    return "course";
  }

  return "general";
}
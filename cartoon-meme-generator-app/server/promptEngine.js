export function getGPTPrompt({ industry, vibe, concept }) {
  return `Industry: ${industry}
Tone: ${vibe}
Meme Concept: ${concept}

Generate:
1. A short caption (1 line max)
2. A short social post (light humor, ends with soft CTA)

Separate with ---`;
}

export function getDallePrompt({ personDescription, concept, vibe }) {
  return `A colorful, cartoon-style digital illustration of ${personDescription}, in a scene representing: '${concept}'. The style should be humorous, lightly exaggerated, and professional enough for a social media post from someone in ${vibe} tone. Centered, flattering, and clearly readable.`;
}

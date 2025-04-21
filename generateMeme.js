import fs from 'fs';
import OpenAI from 'openai';
import { getGPTPrompt, getDallePrompt } from '../promptEngine.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function generateMeme(req, res) {
  try {
    const { industry, vibe, concept } = req.body;
    const headshotPath = req.file.path;

    const gptPrompt = getGPTPrompt({ industry, vibe, concept });
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a witty meme marketer for boring industries.' },
        { role: 'user', content: gptPrompt }
      ]
    });

    const output = chat.choices[0].message.content.split(/---/);
    const caption = output[0].trim();
    const postText = output[1].trim();

    const base64Image = fs.readFileSync(headshotPath, { encoding: 'base64' });
    const dallePrompt = getDallePrompt({ personDescription: 'person from uploaded image', concept, vibe });

    const imageGen = await openai.images.generate({
      model: 'dall-e-3',
      prompt: dallePrompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url'
    });

    fs.unlinkSync(headshotPath); // Cleanup temp file

    res.json({
      imageUrl: imageGen.data[0].url,
      caption,
      postText
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Meme generation failed.' });
  }
}

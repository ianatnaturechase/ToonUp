# Cartoon Meme Generator

A full-stack app that generates cartoon-style memes with GPT-4 and DALL·E 3.

## Features
- Upload a headshot
- Describe the tone and meme concept
- Get a caption, post text, and cartoon image

## Setup
1. Clone the repo
2. Run `npm install` in both `/client` and `/server`
3. Add an `.env` file in `/server` with:

```
OPENAI_API_KEY=your_openai_key_here
```

4. Run backend: `node server/server.js`
5. Run frontend: `npm run dev` from `/client`

## Deploy
- Push to GitHub
- Import to Vercel
- Set your OpenAI API key in Vercel project settings

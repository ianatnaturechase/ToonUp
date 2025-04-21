import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import generateMeme from './routes/generateMeme.js';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/generate-meme', upload.single('image'), generateMeme);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

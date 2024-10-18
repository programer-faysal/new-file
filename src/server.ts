import express from 'express';
import dotenv from 'dotenv'; 
import { cornJob } from './services/cronJob';
import { createManyReels } from './createManyReels';
const app = express();
app.use(express.json());
dotenv.config();

app.get('/search-reels', async (req, res)=> {
  await cornJob();
  res.send("Done")
})

app.post('/many-reels', async (req, res)=> {
  const { pageId, status, userId, links } = req.body;
  if(pageId && status && userId && links){
    try {
      const result = await createManyReels({links, pageId, status, userId})
      res.json({message: "Reels store done", result})
      return
    } catch (error) {
      console.log(error)
    }
  }
  res.send("Must provide data")
})

app.get("/", (req, res)=> {
  res.send("Welcome to my home page server")
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

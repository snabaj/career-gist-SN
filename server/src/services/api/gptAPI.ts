import express, {Request, Response, Router} from "express";
import axios from "axios";
import { getCache, setCache } from "../../cache/redisCacheService.js";
import AxiosXHR = Axios.AxiosXHR;

const router : Router = express.Router();
const OPENAI_API_URL: string = process.env.OPENAI_API_URL ?? "";
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? "";

router.post("/generate", async (req: Request, res: Response) : Promise<void> => {
  const { jobTitle, description } = req.body;
  const cacheKey = `gpt:${jobTitle}`;

  try {
    const cachedData : string | null = await getCache(cacheKey);
    if (cachedData) {
      console.log("⚡ Serving GPT response from cache");
      res.json({ result: cachedData });
      return;
    }

    const response : AxiosXHR<{ choices: { text: string }[] }> = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4",
        prompt: `Summarize the job: ${jobTitle}\nDescription: ${description}`,
        max_tokens: 250,
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );

    await setCache(cacheKey, (response.data as { choices: { text: string }[] }).choices[0].text, 7200);

    console.log("🌍 GPT response fetched from API");
    res.json({ result: (response.data as { choices: { text: string }[] }).choices[0].text });
  } catch (error) {
    if ((error)) {
        console.error("❌ GPT API Error:", (error as any)?.response?.data || (error as Error).message);
    } else {
        console.error("❌ GPT API Error:", error);
    }
    res.status(500).json({ error: "❌ Failed to generate response", errorMessage: (error as Error).message });
  }
});

export default router;
import express, {Router, Request, Response, NextFunction} from 'express';
import { getCache, setCache } from '../../cache/redisCacheService.js';

const router: Router = express.Router();
const CAREER_GIST_API: string = process.env.CAREER_GIST_API ?? '';
const CAREER_GIST_URL: string = process.env.CAREER_GIST_URL ?? '';

// POST /generate - Get a GPT-4o response
router.post('/generate', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const { jobTitle, description } = req.body;
    const cacheKey = `gpt:${jobTitle}`;

    try {
      const cachedData: string | null = await getCache(cacheKey);
      if (cachedData) {
        console.log(`⚡️ Serving GPT-4o response from cache...`);
        return res.json({ success: true, result: cachedData });
      }

      const response = await fetch(CAREER_GIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CAREER_GIST_API}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          prompt: `Summarize the job: ${jobTitle}\nDescription: ${description}`,
          max_tokens: 250,
        }),
      });

      if (!response.ok) {
        console.warn(`⚠️ GPT API request failed: ${response.status} - ${response.statusText}`);
        return res.status(response.status).json({
          success: false,
          message: "GPT API request failed. Please try again later.",
          statusCode: response.status
        });
      }

      const data = await response.json();
      const generatedText = data?.choices?.[0]?.text ?? "No meaningful response received.";

      await setCache(cacheKey, generatedText, 3600);

      console.log("🌍 GPT response fetched from API");
      return res.json({ success: true, result: generatedText });

    } catch (error) {
      console.error("❌ GPT API Error:", error instanceof Error ? error.message : error);

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
        errorDetails: error instanceof Error ? error.message : "Unknown error"
      });
    }
  })().catch(next);
});

export default router;
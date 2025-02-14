import express, {Request, Response, Router} from "express";
import { getJobListings } from "../../services/jSearchServices.js";
import { generateEnhancedJobData } from "../../services/gptService.js";
import { redisClient, cacheEnhancedJobData } from "../../cache/redisCacheService.js";


const router : Router = express.Router();

router.get("/query", (req: Request, res: Response) => {
  (async () => {
    try {
      const query = req.query.query as string;
      if (!query) {
        return res.status(400).json({ error: "Missing job search query." });
      }

      const rawCacheKey = `job-search:${query}`;
      const enhancedCacheKey = `job-enhanced:${query}`;

      const cachedEnhancedData : string | null = await redisClient.get(enhancedCacheKey);
      if (cachedEnhancedData) {
        return res.json(JSON.parse(cachedEnhancedData));
      }

      const cachedRawData : string | null = await redisClient.get(rawCacheKey);
      let jobData;

      if (cachedRawData) {
        jobData = JSON.parse(cachedRawData);
      } else {
        jobData = await getJobListings(query);

        await redisClient.set(rawCacheKey, JSON.stringify(jobData), { EX: 900 });
      }

      let enhancedData;
      try {
        enhancedData = await generateEnhancedJobData(jobData);
        if (!enhancedData || enhancedData.length === 0) {
          console.warn("⚠️ OpenAI enhancement failed. Using raw job data.");
          enhancedData = jobData;
        }
      } catch (error) {
        console.error("❌ Error enhancing job data:", error);
        enhancedData = jobData;
      }

      await cacheEnhancedJobData(query, enhancedData);
      return res.json({ data: enhancedData });

    } catch (error) {
      console.error("❌ Error fetching job data:", error);
      return res.status(500).json({ error: "Error fetching job data." });
    }
    })();
});

export default router;

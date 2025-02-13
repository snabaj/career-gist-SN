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
        console.log("✅ Returning cached enhanced job data...");
        return res.json(JSON.parse(cachedEnhancedData));
      }

      const cachedRawData : string | null = await redisClient.get(rawCacheKey);
      let jobData;

      if (cachedRawData) {
        console.log("✅ Returning cached raw job data...");
        jobData = JSON.parse(cachedRawData);
      } else {
        console.log("🛠 Fetching fresh job data from JSearch API...");
        jobData = await getJobListings(query);

        await redisClient.set(rawCacheKey, JSON.stringify(jobData), { EX: 900 });
      }

      console.log("⚡ Enhancing job data using GPT...");
      const enhancedData = await generateEnhancedJobData(jobData);

      await cacheEnhancedJobData(query, enhancedData);

      const data = enhancedData.length ? enhancedData : jobData;
      return res.json({data});
    } catch (error) {
      console.error("❌ Job search error:", error);
      return res.status(500).json({ error: "Failed to fetch job listings." });
    }
  })();
});

export default router;

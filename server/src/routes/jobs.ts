import express, {NextFunction, Request, Response, Router} from "express";
import axios from "axios";
import { getCache, setCache, deleteCache, clearCache } from "../cache/redisCacheService.js";
import AxiosXHR = Axios.AxiosXHR;

const router : Router = express.Router();
const API_URL = "https://jobs.github.com/positions.json"; // Example GitHub jobs API

router.get("/search", (req: Request, res: Response, next: NextFunction) : void => {
  const query = req.query.q as string;
  const location = req.query.location as string;
  const cacheKey = `jobs:${query}`;

  (async () : Promise<void> => {
    try {
      const cachedData = await getCache(cacheKey);
      if (cachedData) {
        console.log("⚡ Serving from cache");
        res.json(cachedData);
        return;
      }

      const response : AxiosXHR<unknown> = await axios.get(API_URL, { params: { description: query, location } });

      await setCache(cacheKey, response.data, 7200);

      console.log("🌍 Fetched from API");
      res.json(response.data);
      return;
    } catch (error) {
      console.error("❌ API Error:", error);
      next(error);
      return;
    }
  })();
});

router.delete("/clear-cache", (req: Request, res: Response, next: NextFunction): void => {
  const key = req.query.key as string;

  if (!key) {
    res.status(400).json({ error: "Cache key is required." });
    return;
  }

  deleteCache(key)
    .then(() : void => {
      console.log(`🗑️ Deleted cache key: ${key}`);
      res.json({ message: `Cache entry '${key}' deleted.` });
    })
    .catch((error) : void => {
      console.error("❌ Error deleting cache:", error);
      next(error);
    });
});

router.delete("/clear-all-cache", async (_req: Request, res: Response) : Promise<void> => {
  try {
    await clearCache();
    console.log("🧹 Cleared all Redis cache.");
    res.json({ message: "All cache cleared." });
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
    res.status(500).json({ error: "❌ Failed to clear cache.", errorMessage: (error instanceof Error ? error.message : "Failed to clear cache... Please try again.") });
  }
});

export default router;

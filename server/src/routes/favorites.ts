import express, {Request, Response, Router} from "express";
import { getCache, setCache, deleteCache } from "../cache/redisCacheService.js";

const router : Router = express.Router();

// ✅ Add job to favorites
router.post("/add", async (req: Request, res: Response) : Promise<void> => {
  const { userId, jobId, jobData } = req.body;
  const cacheKey = `favorites:${userId}`;

  try {
    let favorites = await getCache(cacheKey);
    if (!favorites) favorites = [];

    favorites.push({ jobId, ...jobData });

    await setCache(cacheKey, favorites, 604800); // Store for 1 week

    res.json({ message: "Job added to favorites", favorites });
  } catch (error) {
    console.error("❌ Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// ✅ Get user favorites
router.get("/:userId", async (req: Request, res: Response) : Promise<void> => {
  const { userId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    const favorites = await getCache(cacheKey);
    res.json(favorites || []);
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// ✅ Remove job from favorites (Using `deleteCache`)
router.delete("/:userId", async (req: Request, res: Response) : Promise<void> => {
  const { userId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    await deleteCache(cacheKey); // 🔥 Use deleteCache to remove all favorites for this user
    res.json({ message: "All favorites removed for user", userId });
  } catch (error) {
    console.error("❌ Error removing favorites:", error);
    res.status(500).json({ error: "Failed to remove favorites" });
  }
});

// ✅ Remove specific job from favorites
router.delete("/:userId/:jobId", async (req: Request, res: Response) : Promise<void> => {
  const { userId, jobId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    let favorites = await getCache(cacheKey);
    if (!favorites) {
        res.json({ message: "No favorites found" });
        return;
    }

    // Remove specific job
    favorites = favorites.filter((job: any) => job.jobId !== jobId);

    // If no jobs left, delete the cache entirely
    if (favorites.length === 0) {
      await deleteCache(cacheKey);
    } else {
      await setCache(cacheKey, favorites, 604800);
    }

    res.json({ message: `Job ${jobId} removed from favorites`, favorites });
  } catch (error) {
    console.error("❌ Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;

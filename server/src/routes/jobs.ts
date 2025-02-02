import { Router, Request, Response } from 'express';
import redisCacheService from '../cache/redisCacheService.js';

const router: Router = Router();

// Simulated PostgreSQL Query (Replace with actual DB query later)
const fetchJobsFromDatabase = async (search: string) => {
  console.log(`Fetching jobs from PostgreSQL for: ${search}`);
  return [
    { id: 1, title: "Software Engineer", company: "TechCorp" },
    { id: 2, title: "Frontend Developer", company: "WebWorks" }
  ];
};

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search as string;

  if (!search) {
    res.status(400).json({ error: "Search query required" });
    return;
  }

  const cachedData = await redisCacheService.get<object[]>(`jobs:${search}`);
  if (cachedData) {
    console.log("🔄 Serving from Redis cache");
    res.json(cachedData);
    return;
  }

  const jobs = await fetchJobsFromDatabase(search);
  await redisCacheService.set(`jobs:${search}`, jobs, 900); // Cache for 15 minutes (too long, too short?) Discuss with team.

  res.json(jobs);
});

export default router;
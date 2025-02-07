import express, { Request, Response } from 'express';
import { fetchJobs } from '../../services/jSearchServices.js';

const router = express.Router();

// GET /api/jsearch/query - Fetch job listings
router.get('/query', async (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query) {
   res.status(400).json({ success: false, message: "Query parameter is required." });
    return;
  }

  try {
    const jobs = await fetchJobs(query);
    res.json({ success: true, data: jobs });
    return;
  } catch (error) {
    console.error("❌ JSearch API error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export default router;

import express, {Request, Response, NextFunction, Router} from "express";
import { generateEnhancedJobData } from "../../services/gptService.js";

const router : Router = express.Router();

router.post("/generate", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const jobData = req.body;
      if (!jobData) {
        return res.status(400).json({ error: "Missing job data for enhancement." });
      }

      const enhancedJobData = await generateEnhancedJobData(jobData);

      return res.json(enhancedJobData);
    } catch (error) {
      console.error("GPT enhancement error:", error);
      return res.status(500).json({ error: "Failed to enhance job data." });
    }
  })().catch(next);
});

export default router;

import { Router } from 'express';
import jobsRoutes from './jobsRoutes.js';
import favorites from "./favorites.js";
import gptAPI from "../services/api/gptAPI.js";


const router: Router = Router();

router.use('/api/jobs', jobsRoutes);
router.use('/api/favorites', favorites);
router.use('/api/gptAPI', gptAPI);


export default router;

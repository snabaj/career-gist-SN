import { Router } from 'express';
import jobsRoutes from './jobs.js';


const router: Router = Router();

router.use('/api/jobs', jobsRoutes);

export default router;

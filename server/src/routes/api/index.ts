import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { jobRouter } from './jobs.js';

const router : Router = Router();

router.use('/users', userRouter);
router.use('/jobs', jobRouter);

export default router;

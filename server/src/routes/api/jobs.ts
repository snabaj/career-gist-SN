import express from 'express';
import { 
    getAllJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    deleteJob 
} from '../../controllers/job-controller.js';

const router = express.Router();

// GET /jobs - Get all jobs
router.get('/', getAllJobs);

// GET /jobs/:id - Get a job by id
router.get('/:id', getJobById);

// POST /jobs - Create a new job
router.post('/', createJob);

// PUT /jobs/:id - Update a job by id
router.put('/:id', updateJob);

// DELETE /jobs/:id - Delete a job by id
router.delete('/:id', deleteJob);

export { router as jobRouter };

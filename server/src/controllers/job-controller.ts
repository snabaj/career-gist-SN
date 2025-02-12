import { Request, Response } from 'express';
import { Job } from '../models/jobsModel.js';
import { User } from '../models/userModel.js';

// GET /jobs 
export const getAllJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['username'],
            }
        ]
    });
    res.json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /jobs/:id
export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const job = await Job.findByPk(id, {
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['username'],
            }
        ]
    });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /jobs/saved - Get saved jobs for the user
export const retrieveSavedJobs = async (_req: Request, res: Response) => {
  try {
    const savedJobs = await Job.findAll({
      where: { saved: true }, 
      include: [{ model: User, as: 'user', attributes: ['username'] }]
    });
    res.json(savedJobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /jobs - save a job to database
export const createJob = async (req: Request, res: Response) => {
  const { title, description, remote_onsite, salary, date_published, experience_level, company_id } = req.body;
  try {
    const newJob = await Job.create({ title, description, remote_onsite, salary, date_published, experience_level, company_id, saved: true });
    res.status(201).json(newJob);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /jobs/:id - Update a job by id
export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.update(req.body);
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /jobs/:id
export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const job = await Job.findByPk(id);
    if (job) {
      await job.destroy();
      res.json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

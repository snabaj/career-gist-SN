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

// POST /jobs
export const createJob = async (req: Request, res: Response) => {
  const { title, description, remote_onsite, salary, date_published, experience_level, company_id } = req.body;
  try {
    const newJob = await Job.create({ title, description, remote_onsite, salary, date_published, experience_level, company_id });
    res.status(201).json(newJob);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /jobs/:id
export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, remote_onsite, salary, date_published, experience_level, company_id } = req.body;
  try {
    const job = await Job.findByPk(id);
    if (job) {
      job.title = title;
      job.description = description;
      job.remote_onsite = remote_onsite;
      job.salary = salary;
      job.date_published = date_published;
      job.experience_level = experience_level;
      job.company_id = company_id;
      await job.save();
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

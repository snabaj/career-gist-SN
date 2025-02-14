import express, {Router} from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';

const router : Router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router as userRouter };

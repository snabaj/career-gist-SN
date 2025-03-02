import { Router, type Request, type Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log('Logging in user:', username);

        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(401).json({ message: 'Invalid Username or Password' });
            return;
        }
        console.log(user.password, password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            res.status(401).json({ message: 'Invalid Username or Password' });
            return;
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
        if (!secretKey) {
            console.error('JWT secret key is not set');
            res.status(500).json({ message: 'Internal Server Error' });
            return;

        }

        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h', });

        res.json({ token });
        return;
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};

const router = Router();

router.post('/login', login);

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log('Creating user:', username);

        // const existingUser = await User.findOne({ where: { username } });

        // if (existingUser) {
        //     res.status(400).json({ message: 'Username already exists' });
        //     return;
        // }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword });

        const secretKey = process.env.JWT_SECRET_KEY as string;
        if (!secretKey) {
            console.error('JWT secret key is not set');
            res.status(500).json({ message: 'Internal Server Error' });
            return;

        }

        const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h', });

        res.json({ token });
        return;
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};

router.post('/signup', signup);

export default router;
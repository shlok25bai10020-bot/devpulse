import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    user = new User({ name, email, password, skills: ['React', 'Node.js', 'MongoDB'] });
    await user.save();
    res.status(201).json({ token: 'mock-jwt-token', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }) || { _id: '123', name: 'Developer Admin', email, skills: ['React', 'TypeScript'] };
    res.json({ token: 'mock-jwt-token', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Your registration code here...
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Your login code here...
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      skills: user.skills,
      gitHubUsername: user.gitHubUsername
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
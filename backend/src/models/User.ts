import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  skills: [{ type: String }],
  githubUsername: { type: String, default: '' }
}, { timestamps: true });

export const User = model('User', userSchema);
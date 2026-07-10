import { Schema, model, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  email: string;
  bio: string;
  skills: string[];
  gitHubUsername: string;
}

const ProfileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true },
  gitHubUsername: { type: String, required: true }
});

export default model<IProfile>('Profile', ProfileSchema);
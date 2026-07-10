import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  bio?: string;
  skills: string[];
  gitHubUsername?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: "No bio added yet." },
  skills: { type: [String], default: [] },
  gitHubUsername: { type: String, default: "" }
});

const User = model<IUser>('User', UserSchema);
export default User;
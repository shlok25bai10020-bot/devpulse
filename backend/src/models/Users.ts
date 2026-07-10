import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  bio?: string;
  skills: string[];
  gitHubUsername: string;
  comparePass(pass: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email id is must'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'password hash is required'],
    },
    bio: {
      type: String,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    gitHubUsername: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre<IUser>('save', async function () {
  if (!this.isModified('passwordHash')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

userSchema.methods.comparePass = async function (pass: string): Promise<boolean> {
  return bcrypt.compare(pass, this.passwordHash);
};

const User = model<IUser>('User', userSchema);
export default User;
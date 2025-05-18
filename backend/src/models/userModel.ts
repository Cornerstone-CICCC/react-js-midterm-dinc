import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, default: '' },
    userName: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    fileId: { type: String, default: '' },
    location: { type: String, default: '' },
    lastLogin: { type: Date, default: null },
    isLoggedIn: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;

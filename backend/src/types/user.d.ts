import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;
  name?: string;
  userName?: string;
  email: string;
  password: string;
  bio?: string;
  fileId?: string;
  location?: string;
  lastLogin?: Date | null;
  isLoggedIn?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(password: string): Promise<boolean>;
}

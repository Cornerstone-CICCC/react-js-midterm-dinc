import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { IUser } from '../types/user';

interface JwtPayload {
  id: string;
}
export interface RequestWithUser extends Request {
  user?: IUser;
}

const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

export default protect;

import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { RequestWithUser } from "../middlewares/authMiddleware";

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return jwt.sign({ id }, secret, {
    expiresIn: '1d',
  });
};

const setTokenCookie = (res: Response, token: string | null) => {
  if (!token) return;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/',
  });
};

const createInitialName = (email: string) => {
  const baseUserName = email.split('@')[0];
  const sanitizedBase = baseUserName.replace(/[^a-zA-Z0-9]/g, '');

  const salt = Date.now().toString() + Math.random().toString();
  const hash = crypto.createHash('md5').update(email + salt).digest('hex');
  return `${sanitizedBase}_${hash.substring(0, 8)}`;
}

const googleAuth = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const initialName = createInitialName(email);

    let user = await User.findOne({ email });

    if (user) {
      user.lastLogin = new Date();
      user.isLoggedIn = true;
      await user.save();

    } else {
      user = await User.create({
        name,
        userName: initialName,
        email,
        password,
      });

      user.lastLogin = new Date();
      user.isLoggedIn = true;
      await user.save();
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.status(user ? 200 : 201).json({
      success: true,
      user: {
        id: user.id.toString(),
        name: user.name || "",
        userName: user.userName || "",
        email: user.email,
        bio: user.bio || "",
        fileId: user.fileId || "",
        location: user.location || "",
        lastLogin: user.lastLogin || null,
        isLoggedIn: true,
      },
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).json({ message: 'Please provide all required fields' });

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    }

    const initialName = createInitialName(email);

    const user = await User.create({
      name: initialName,
      userName: initialName,
      email,
      password,
    });

    if (user) {
      user.lastLogin = new Date();
      user.isLoggedIn = true;
      await user.save();

      const token = generateToken(user._id);
      setTokenCookie(res, token);

      res.status(201).json({
        success: true,
        user: {
          id: user.id.toString(),
          name: user.name,
          userName: user.userName,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      user.lastLogin = new Date();
      user.isLoggedIn = true;
      await user.save();

      const token = generateToken(user._id);
      setTokenCookie(res, token);

      res.json({
        success: true,
        token: token,
        user: {
          id: user.id.toString(),
          name: user.name || "",
          userName: user.userName || "",
          email: user.email,
          bio: user.bio || "",
          fileId: user.fileId || "",
          location: user.location || "",
          lastLogin: user.lastLogin || null,
          isLoggedIn: true,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const logout = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.user?._id;

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    }

    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

export {
  googleAuth,
  signup,
  login,
  logout,
}
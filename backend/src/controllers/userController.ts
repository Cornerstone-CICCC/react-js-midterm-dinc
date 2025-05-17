import { Request, Response } from "express";
import User from "../models/userModel";
import { RequestWithUser } from "../middlewares/authMiddleware";
import { IUser } from "../types/user";

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password")

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false , message: "Server error" })
  }
}

const updateUserById = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.params.id;

    if (req.user && req.user._id.toString() !== userId) {
      res.status(403).json({ success: false, message: "You are not authorized to update this user" });
      return;
    }

    const { userName, email, ...otherUpdates } = req.body;

    const updateData: Partial<IUser> = { ...otherUpdates };

    if (userName) {
      const existingUserName = await User.findOne({ userName, _id: { $ne: userId } });

      if (existingUserName) {
        res.status(400).json({ success: false, message: "This user name already exists" });
        return;
      }

      updateData.userName = userName;
    }

    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: userId } });

      if (existingEmail) {
        res.status(400).json({ success: false, message: "This email already exists" });
        return;
      }

      updateData.email = email;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found"})
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch(error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { getUserById, updateUserById };
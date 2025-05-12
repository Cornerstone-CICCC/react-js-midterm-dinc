import { Request, Response, NextFunction } from "express";

export const sayHello = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "Hello, World!" });
  } catch (error) {
    next(error);
  }
};

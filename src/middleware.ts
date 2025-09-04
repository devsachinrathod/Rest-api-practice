import type { Request, Response, NextFunction } from "express";

export function authChecker(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (username !== "sachin" || password !== "echan") {
    return res.status(401).json({ message: "User does not exist in this website" });
  }

  console.log("✅ User authenticated successfully");
  next(); // continue
}

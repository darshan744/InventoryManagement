import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    // Simulate login logic
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

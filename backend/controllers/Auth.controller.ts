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

export const signup = async (req: Request, res: Response) => {
  try {
    // Simulate signup logic
    const { username, password } = req.body;
    if (username && password) {
      res.status(201).json({ message: "Signup successful" });
    } else {
      res.status(400).json({ message: "Username and password are required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Simulate logout logic
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


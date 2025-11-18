import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Get all employees (admin only)
export const getEmployees = async (req, res) => {
  const employees = await User.find({ role: "employee" }).select("-password");
  res.json(employees);
};

// Get all users (for task assignment dropdown)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

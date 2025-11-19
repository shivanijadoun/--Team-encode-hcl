const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.json({ message: "Profile updated", user });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) return res.status(400).json({ message: "Old password incorrect" });

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated" });
};

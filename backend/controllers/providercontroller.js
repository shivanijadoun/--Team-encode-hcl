const User = require("../models/User");
const Reminder = require("../models/Reminder");
const HealthTip = require("../models/HealthTip");

exports.getAllPatients = async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("-password");
  res.json(patients);
};

exports.getPatientRecords = async (req, res) => {
  const records = await Reminder.find({ user: req.params.id });
  res.json(records);
};

exports.addHealthTip = async (req, res) => {
  const { title, description } = req.body;
  const tip = await HealthTip.create({ title, description });
  res.json({ message: "Health tip added", tip });
};

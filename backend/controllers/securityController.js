const Logs = require("../models/Logs");

exports.getLogs = async (req, res) => {
  const logs = await Logs.find().sort({ createdAt: -1 }).limit(100);
  res.json(logs);
};

exports.suspiciousActivity = async (req, res) => {
  const alerts = await Logs.find({ type: "suspicious" });
  res.json(alerts);
};

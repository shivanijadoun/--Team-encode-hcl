const HealthTip = require("../models/HealthTip");
const Reminder = require("../models/Reminder");

exports.getHealthTips = async (req, res) => {
  const tips = await HealthTip.find();
  res.json(tips);
};

exports.getReminders = async (req, res) => {
  const reminders = await Reminder.find().limit(10);
  res.json(reminders);
};

const Reminder = require("../models/Reminder");
const PatientGoal = require("../models/PatientGoal");

exports.getDashboard = async (req, res) => {
  const reminders = await Reminder.find({ user: req.user._id });
  const goals = await PatientGoal.find({ user: req.user._id });

  res.json({ reminders, goals });
};

exports.updateDailyRecord = async (req, res) => {
  const { waterIntake, steps, sleepHours, mood } = req.body;

  const record = await Reminder.create({
    user: req.user._id,
    waterIntake,
    steps,
    sleepHours,
    mood
  });

  res.json({ message: "Record updated", record });
};

exports.getRecords = async (req, res) => {
  const records = await Reminder.find({ user: req.user._id });
  res.json(records);
};

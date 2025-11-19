const PatientGoal = require('../models/PatientGoal');


exports.addGoal = async (req, res) => {
try {
const g = await PatientGoal.create({ ...req.body, user: req.user._id });
res.status(201).json(g);
} catch (err) { res.status(500).json({ message: err.message }); }
};


exports.getGoals = async (req, res) => {
try {
const goals = await PatientGoal.find({ user: req.user._id });
res.json(goals);
} catch (err) { res.status(500).json({ message: err.message }); }
};


exports.updateGoal = async (req, res) => {
try {
const goal = await PatientGoal.findOne({ _id: req.params.goalId, user: req.user._id });
if (!goal) return res.status(404).json({ message: 'Goal not found' });
Object.assign(goal, req.body);
await goal.save();
res.json(goal);
} catch (err) { res.status(500).json({ message: err.message }); }
};


exports.deleteGoal = async (req, res) => {
try {
await PatientGoal.deleteOne({ _id: req.params.goalId, user: req.user._id });
res.json({ message: 'Deleted' });
} catch (err) { res.status(500).json({ message: err.message }); }
};
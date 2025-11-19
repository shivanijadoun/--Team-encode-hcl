const mongoose = require('mongoose');


const GoalSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
type: { type: String, enum: ['steps','water','sleep','custom'], default: 'custom' },
target: { type: Number, default: 0 },
progress: { type: Number, default: 0 },
date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('PatientGoal', GoalSchema);
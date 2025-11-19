const mongoose = require('mongoose');


const TipSchema = new mongoose.Schema({
text: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('HealthTip', TipSchema);
const mongoose = require('mongoose');


const LogSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
action: String,
resource: String,
timestamp: { type: Date, default: Date.now },
ip: String
});


module.exports = mongoose.model('Log', LogSchema);
const Log = require('../models/Log');


const logAction = async (req, res, next) => {
try {
const entry = new Log({
user: req.user ? req.user._id : null,
action: `${req.method} ${req.originalUrl}`,
resource: req.originalUrl,
ip: req.ip
});
await entry.save();
} catch (err) {
// do not block request on logging errors
console.error('Logging failed', err.message);
}
next();
};


module.exports = logAction;
const express = require("express");
const router = express.Router();
const { getLogs, suspiciousActivity } = require("../controllers/securityController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/logs", auth, role("provider"), getLogs);
router.get("/alerts", auth, role("provider"), suspiciousActivity);

module.exports = router;

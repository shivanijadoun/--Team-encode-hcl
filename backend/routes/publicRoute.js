const express = require("express");
const router = express.Router();
const { getHealthTips, getReminders } = require("../controllers/publicController");

router.get("/tips", getHealthTips);
router.get("/reminders", getReminders);

module.exports = router;

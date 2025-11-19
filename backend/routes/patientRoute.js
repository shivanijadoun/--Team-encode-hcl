const express = require("express");
const router = express.Router();
const { getDashboard, updateDailyRecord, getRecords } = require("../controllers/patientController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/dashboard", auth, role("patient"), getDashboard);
router.post("/record", auth, role("patient"), updateDailyRecord);
router.get("/records", auth, role("patient"), getRecords);

module.exports = router;

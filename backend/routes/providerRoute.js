const express = require("express");
const router = express.Router();
const { getAllPatients, getPatientRecords, addHealthTip } = require("../controllers/providerController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/patients", auth, role("provider"), getAllPatients);
router.get("/patients/:id/records", auth, role("provider"), getPatientRecords);
router.post("/health-tip", auth, role("provider"), addHealthTip);

module.exports = router;

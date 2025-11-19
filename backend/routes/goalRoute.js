const express = require("express");
const router = express.Router();
const { createGoal, getGoals, updateGoal, deleteGoal } = require("../controllers/goalController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("patient"), createGoal);
router.get("/", auth, role("patient"), getGoals);
router.put("/:id", auth, role("patient"), updateGoal);
router.delete("/:id", auth, role("patient"), deleteGoal);

module.exports = router;

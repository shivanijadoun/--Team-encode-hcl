const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, changePassword } = require("../controllers/profileController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.put("/password", auth, changePassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUserData,
	getAllUsers,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);
router.get("/", getAllUsers);

module.exports = router;

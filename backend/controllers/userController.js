const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc  Register a new user
// @route POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill all fields");
	}

	// Check whether if user exists
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User already exists");
	}

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			password: hashPassword,
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}

	res.json(req.body);
});

// @desc  Authenticate User
// @route POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for user email
	const user = await User.findOne({ email });

	// check password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json(user);
	} else {
		res.status(400);
		throw new Error("Invalid user credential");
	}

	res.json({
		message: "Login User",
	});
});

// @desc  Get user's data
// @route GET /api/users/me
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
	res.json({
		message: "get user data",
	});
});

module.exports = { registerUser, loginUser, getUserData };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc  Get all user
// @route GET /api/users
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find();

	res.status(200).json({
		users,
	});
});

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
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
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
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user credential");
	}
});

// @desc  Get user's data
// @route GET /api/users/me
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
	const { _id, email, name } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

// generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { registerUser, loginUser, getUserData, getAllUsers };

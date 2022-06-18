// @desc  Register a new user
// @route POST /api/users
// @access  Public
const registerUser = (req, res) => {
	res.json({
		message: "register user",
	});
};

// @desc  Authenticate User
// @route POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
	res.json({
		message: "Login User",
	});
};

// @desc  Get user's data
// @route GET /api/users/me
// @access  Private
const getUserData = (req, res) => {
	res.json({
		message: "get user data",
	});
};

module.exports = { registerUser, loginUser, getUserData };

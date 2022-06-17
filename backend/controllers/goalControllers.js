const asyncHandler = require("express-async-handler");

// @desc  get goals
// @route GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: "Getting data",
	});
});

// @desc  set goals
// @route POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add text");
	}
	res.status(200).json({ message: "set Data" });
});

// @desc  update goals
// @route PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	res
		.status(200)
		.json({ message: `update data with the id of ${req.params.id}` });
});

// @desc  delete goals
// @route DELETE /api/goals:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `deleting data with the id of ${req.params.id}`,
	});
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};

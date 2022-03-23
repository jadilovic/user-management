const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const createUser = async (req, res) => {
	console.log(req.body);
	const user = await User.create({ ...req.body });
	// const user = await User.findOne(
	// 	{ email: req.body.email },
	// 	{ _id: 1, email: 1, firstName: 1, lastName: 1, role: 1 }
	// );
	// const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ user });
};

const getUser = async (req, res) => {
	const {
		params: { id: userId },
	} = req;
	const user = await User.findOne(
		{ _id: userId },
		{
			firstName: 1,
			lastName: 1,
			userName: 1,
			email: 1,
			status: 1,
			permission: 1,
		}
	);
	res.status(StatusCodes.OK).json({ user });
};

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.status(StatusCodes.OK).json({ users, length: users.length });
};

const updateUser = async (req, res) => {
	const {
		body: { firstName, lastName, email, status },
		params: { id: userId },
	} = req;
	const user = await User.findByIdAndUpdate(
		{ _id: userId },
		{ firstName, lastName, email, status },
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
	const {
		params: { id: userId },
	} = req;
	const user = await User.findByIdAndRemove({ _id: userId });
	res.status(StatusCodes.OK).json({ user });
};

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser };

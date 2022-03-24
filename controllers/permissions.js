const Permission = require('../models/Permission');
const { StatusCodes } = require('http-status-codes');

const createPermission = async (req, res) => {
	const permission = await Permission.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ permission });
};

const getPermission = async (req, res) => {
	const {
		params: { id: permissionId },
	} = req;
	const permission = await User.findById(
		{ _id: permissionId },
		{
			code: 1,
			description: 1,
		}
	);
	res.status(StatusCodes.OK).json({ permission });
};

const getAllPermissions = async (req, res) => {
	const permissions = await Permission.find({});
	res.status(StatusCodes.OK).json({ permissions, length: permissions.length });
};

module.exports = { createPermission, getAllPermissions, getPermission };

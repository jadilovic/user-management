const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	permissions: [
		{
			type: String,
		},
	],
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;

const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Permission = new mongoose.model('Permission', PermissionSchema);

module.exports = Permission;

const express = require('express');
const router = express.Router();

const {
	getAllPermissions,
	createPermission,
	getPermission,
} = require('../controllers/permissions');

router.route('/').post(createPermission).get(getAllPermissions);
router.route('/:id').get(getPermission);

module.exports = router;

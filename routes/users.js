const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
	createUser,
} = require('../controllers/users');

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').patch(updateUser).delete(deleteUser).get(getUser);

module.exports = router;

import axios from 'axios';

const useAxios = () => {
	const createUser = async (userData) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
			data: userData,
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	// GET USERS
	const getAllUsers = async () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
		}).then((res) => {
			return res.data.users;
		});
	};

	// GET PERMISSIONS
	const getAllPermissions = async () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/permissions`,
		}).then((res) => {
			return res.data.permissions;
		});
	};

	const getUser = async (userId) => {
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userId}`)
			.then((res) => {
				return res.data.user;
			});
	};

	const updateUser = async (editedUser) => {
		const { _id, firstName, lastName, email, status, permissions } = editedUser;
		return axios
			.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${_id}`, {
				firstName,
				lastName,
				email,
				status,
				permissions,
			})
			.then((res) => {
				return res.data;
			});
	};

	const deleteUser = async (userId) => {
		try {
			return axios
				.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userId}`)
				.then((res) => {
					return res.data.user;
				});
		} catch (err) {
			console.log(err);
			return err.response.msg;
		}
	};

	return {
		deleteUser,
		createUser,
		getAllUsers,
		getUser,
		updateUser,
		getAllPermissions,
	};
};

export default useAxios;

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Snackbar, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/ConfirmDialog';
import useAxiosRequest from '../hooks/useAxiosRequest';
import LoadingPage from '../components/LoadingPage';

const Users = () => {
	const mongoDB = useAxiosRequest();
	const [users, setUsers] = useState([]);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const displayUsers = async () => {
		try {
			const dbUsers = await mongoDB.getAllUsers();
			setUsers(dbUsers);
			setLoading(false);
		} catch (err) {
			console.log(err.response);
		}
	};

	useEffect(() => {
		displayUsers();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleEdit = (event, cellValue) => {
		localStorage.setItem('userId', cellValue.row._id);
		return navigate('/edit_user');
	};

	const handleAssign = (event, cellValue) => {
		localStorage.setItem('userId', cellValue.row._id);
		return navigate('/assign_permission');
	};

	const deleteUser = async (userObject) => {
		setLoading(true);
		try {
			const deletedUser = await mongoDB.deleteUser(userObject._id);
			if (deletedUser) {
				setSnackbarMsg(`User ${deletedUser.userName} was deleted!`);
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} else {
				setSnackbarMsg(`Failed to delete user ${userObject._id}!`);
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		} catch (error) {
			setSnackbarMsg(
				`Failed to delete user ${userObject._id}! Error message: ${error.response.data.msg}`
			);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
		displayUsers();
	};

	const handleDeleteUser = (userObject) => {
		setSelectedUser(userObject);
		setConfirmOpen(true);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
		{ field: 'userName', headerName: 'User name', flex: 1 },
		{ field: 'firstName', headerName: 'First name', flex: 1 },
		{ field: 'lastName', headerName: 'Last name', flex: 1 },
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
		},
		{
			field: 'edit',
			headerName: 'Edit',
			flex: 1,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleEdit(event, cellValues);
						}}
					>
						Edit
					</Button>
				);
			},
		},
		{
			field: 'assign',
			headerName: 'Assign',
			flex: 1,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="secondary"
						onClick={(event) => {
							handleAssign(event, cellValues);
						}}
					>
						Assign
					</Button>
				);
			},
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			flex: 1,
			renderCell: (params) => (
				<Button
					variant="outlined"
					aria-label="delete"
					color="error"
					style={{ marginLeft: 16 }}
					onClick={() => handleDeleteUser(params.row)}
				>
					<DeleteIcon />
				</Button>
			),
		},
	];

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div>
			<Box
				sx={{
					flexGrow: 1,
					width: '100%',
				}}
			>
				<div style={{ height: 595, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row._id}
						rows={users}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</div>
				<div>
					<ConfirmDialog
						deleteUser={deleteUser}
						selectedUser={selectedUser}
						setConfirmOpen={setConfirmOpen}
						confirmOpen={confirmOpen}
					/>
				</div>
				<Stack spacing={2} sx={{ width: '100%' }}>
					<Snackbar
						open={openSnackbar}
						autoHideDuration={5000}
						onClose={handleCloseSnackbar}
					>
						<Alert
							onClose={handleCloseSnackbar}
							severity={snackbarSeverity}
							sx={{ width: '100%' }}
						>
							{snackbarMsg}
						</Alert>
					</Snackbar>
				</Stack>
			</Box>
		</div>
	);
};

export default Users;

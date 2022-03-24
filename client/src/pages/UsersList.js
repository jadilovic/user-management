import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../hooks/useAxiosRequest';
import LoadingPage from '../components/LoadingPage';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const mongoDB = useAxiosRequest();
	const [users, setUsers] = useState([]);
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
		console.log('edit');
		localStorage.setItem('userId', cellValue.row._id);
		return navigate('/edit_user');
	};

	const handleAssign = () => {};

	const handleDelete = () => {};

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
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
			field: 'delete',
			headerName: 'Delete',
			flex: 1,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="error"
						onClick={(event) => {
							handleDelete(event, cellValues);
						}}
					>
						Delete
					</Button>
				);
			},
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
			</Box>
		</div>
	);
};

export default Users;

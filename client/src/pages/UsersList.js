import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import useAxiosRequest from '../hooks/useAxiosRequest';
import LoadingPage from '../components/LoadingPage';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import useLocalStorageHook from '../utils/useLocalStorageHook';

const Users = () => {
	const mongoDB = useAxiosRequest();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	// const history = useHistory();
	// const data = useLocalStorageHook();

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

	const handleClick = (event, cellValue) => {
		//	data.saveSelectedUserId(cellValue.row._id);
		//history.push('/profile');
	};

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
		{ field: 'firstName', headerName: 'First name', flex: 1 },
		{ field: 'lastName', headerName: 'Last name', flex: 1 },
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		// {
		// 	field: 'isActive',
		// 	headerName: 'Active',
		// 	minWidth: 30,
		// 	renderCell: (cellValues) => {
		// 		return (
		// 			<Chip
		// 				style={{
		// 					minWidth: 80,
		// 				}}
		// 				label={`${cellValues.row.isActive ? 'Yes' : 'No'}`}
		// 				color={`${cellValues.row.isActive ? 'success' : 'error'}`}
		// 				variant="outlined"
		// 			/>
		// 		);
		// 	},
		// },
		{
			field: 'edit',
			headerName: 'Info / Edit',
			flex: 1,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					>
						Info / Edit
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
				<Typography align="center">List of users</Typography>
				<div style={{ height: 570, width: '100%' }}>
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

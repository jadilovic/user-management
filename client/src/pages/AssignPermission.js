import React, { useState, useEffect, useRef } from 'react';
import {
	Button,
	Typography,
	Container,
	Grid,
	Box,
	Alert,
	Select,
	MenuItem,
	Snackbar,
	Stack,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingPage from '../components/LoadingPage';
import useAxiosRequest from '../hooks/useAxiosRequest';

export const AssignPermission = () => {
	const mongoDB = useAxiosRequest();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState(null);
	const [userValue, setUserValue] = useState({});
	const [permissions, setPermissions] = useState([]);
	const [permissionId, setPermissionId] = useState('');
	const [loading, setLoading] = useState(true);
	const [deletePermission, setDeletePermission] = useState(false);
	const isMounted = useRef(false);

	const getAllPermissions = async () => {
		const permissions = await mongoDB.getAllPermissions();
		setPermissions(permissions);
		setPermissionId(permissions[0]._id);
		setLoading(false);
	};

	const getUserObject = async (id) => {
		const user = await mongoDB.getUser(id);
		setUserValue(user);
		getAllPermissions();
	};

	useEffect(() => {
		const userId = localStorage.getItem('userId');
		getUserObject(userId);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleChange = (e) => {
		setPermissionId(e.target.value);
	};

	const updateUser = async () => {
		setLoading(true);
		const updatedUser = await mongoDB.updateUser(userValue);
		if (updatedUser) {
			setSnackbarMsg(`User ${updatedUser.user.userName} was updated!`);
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} else {
			setSnackbarMsg(`Failed to updated user!`);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
		getUserObject(updatedUser.user._id);
	};

	const handleSubmit = () => {
		if (userValue.permissions.indexOf(permissionId) === -1) {
			userValue.permissions.push(permissionId);
			setUserValue({ ...userValue, permissions: userValue.permissions });
			updateUser();
		}
	};

	const getCodeAndDescription = (permissionId) => {
		const permission = permissions.find(
			(permission) => permission._id === permissionId
		);
		return `${permission.code} ${permission.description}`;
	};

	useEffect(() => {
		if (isMounted.current) {
			updateUser();
		} else {
			isMounted.current = true;
		}
	}, [deletePermission]); // eslint-disable-line react-hooks/exhaustive-deps

	const removePermission = (permissionId) => {
		const remainingPermissions = userValue.permissions.filter(
			(permission) => permission !== permissionId
		);
		setUserValue({ ...userValue, permissions: remainingPermissions });
		setDeletePermission(!deletePermission);
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<Container component="main" maxWidth="md">
				<Card style={{ marginTop: 10 }}>
					<CardContent>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Typography color="textPrimary" gutterBottom variant="h5">
								Assign Permission to User Page
							</Typography>
							<Typography color="textPrimary" gutterBottom variant="h5">
								{userValue.userName}
							</Typography>
							<Typography color="textSecondary" variant="body2">
								{`${userValue.firstName} ${userValue.lastName}`}
							</Typography>
							<Typography color="textSecondary" variant="body2">
								{userValue.email}
							</Typography>
							<Typography color="textSecondary" variant="body2">
								{userValue.status}
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Box>
					<Typography marginTop={2} component="h1" variant="h5">
						Select permission:
					</Typography>
					<Box sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<Select
									fullWidth
									value={permissionId}
									name="permission"
									onChange={handleChange}
								>
									{permissions.map((permission) => {
										return (
											<MenuItem key={permission._id} value={permission._id}>
												{`${permission.code} ${permission.description}`}
											</MenuItem>
										);
									})}
								</Select>
							</Grid>
						</Grid>
						<Button
							fullWidth
							onClick={handleSubmit}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							ADD PERMISSION
						</Button>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Typography sx={{ mt: 2 }} variant="h6" component="div">
								{`${
									userValue.permissions.length > 0
										? 'List of permissions'
										: 'No permissions assigned to the user'
								}`}
							</Typography>
							<List>
								{userValue.permissions.map((permission) => {
									return (
										<ListItem
											key={permission}
											secondaryAction={
												<Button
													variant="contained"
													color="error"
													onClick={() => removePermission(permission)}
													key={permission}
													edge="end"
													aria-label="delete"
												>
													<DeleteIcon />
													Remove
												</Button>
											}
										>
											<ListItemText
												key={permission}
												primary={getCodeAndDescription(permission)}
											/>
										</ListItem>
									);
								})}
							</List>
						</Grid>
					</Grid>
				</Box>
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
			</Container>
		</>
	);
};

export default AssignPermission;

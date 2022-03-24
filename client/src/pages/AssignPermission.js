import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../hooks/useAxiosRequest';
import {
	TextField,
	Button,
	Typography,
	Container,
	Grid,
	Box,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Snackbar,
	Stack,
	Card,
	CardContent,
	Avatar,
	Divider,
	CardActions,
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';

export const AssignPermission = () => {
	const mongoDB = useAxiosRequest();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState(null);
	const [userValue, setUserValue] = useState({});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	const getUserObject = async (id) => {
		const user = await mongoDB.getUser(id);
		console.log('test user : ', user);
		setUserValue(user);
		setLoading(false);
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
		setError('');
		setUserValue({ ...userValue, [e.target.name]: e.target.value });
	};

	const updateUser = async () => {
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
		console.log(updatedUser);
		setLoading(true);
		getUserObject(updatedUser.user._id);
	};

	const handleSubmit = () => {
		// const keys = Object.keys(userValue);
		// keys.forEach((key) => {
		// 	if (!userValue[key]) {
		// 		setError(
		// 			`All fields are required! Please complete all fields in the form.`
		// 		);
		// 		return;
		// 	}
		// });
		updateUser();
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
							<Avatar
								sx={{
									height: 64,
									mb: 2,
									width: 64,
								}}
							/>
							<Typography color="textPrimary" gutterBottom variant="h5">
								Assign Permission to User
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
					<Box sx={{ mt: 3 }}>
						{error && (
							<Box
								sx={{
									paddingTop: 2,
									paddingBottom: 2,
									bgcolor: 'background.paper',
								}}
							>
								<Alert severity="error">{error}</Alert>
							</Box>
						)}
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<Select
									fullWidth
									value={
										userValue.permission
											? userValue.permission
											: 'No permission assigned'
									}
									label="Permission"
									name="permission"
									onChange={handleChange}
								>
									<MenuItem value="No permission assigned">
										No permission assigned
									</MenuItem>
									<MenuItem value="Code">Code</MenuItem>
									<MenuItem value="Description">Description</MenuItem>
								</Select>
							</Grid>
						</Grid>
						<Button
							fullWidth
							onClick={handleSubmit}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Save
						</Button>
					</Box>
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

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
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';

export const EditUser = () => {
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
	}, []);

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
		const keys = Object.keys(userValue);
		keys.forEach((key) => {
			if (!userValue[key]) {
				setError(
					`All fields are required! Please complete all fields in the form.`
				);
				return;
			}
		});
		updateUser();
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<Container component="main" maxWidth="md">
				<Box
					sx={{
						marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						Update user: {userValue.userName}
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
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									value={userValue.firstName}
									onChange={handleChange}
									required
									fullWidth
									id="firstName"
									label="First name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last name"
									name="lastName"
									value={userValue.lastName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email"
									name="email"
									value={userValue.email}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Status</InputLabel>
									<Select
										value={userValue.status}
										label="Status"
										name="status"
										onChange={handleChange}
									>
										<MenuItem value="Junior">Junior</MenuItem>
										<MenuItem value="Medior">Medior</MenuItem>
										<MenuItem value="Senior">Senior</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							fullWidth
							onClick={handleSubmit}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Submit
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

export default EditUser;

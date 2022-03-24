import React, { useState } from 'react';
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
import useAxios from '../hooks/useAxios';

export const CreateUser = () => {
	const mongoDB = useAxios();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState(null);
	const [userValue, setUserValue] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
		email: '',
		status: 'Junior',
	});
	const [error, setError] = useState('');

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

	const createNewUser = async () => {
		const newUser = await mongoDB.createUser(userValue);
		if (newUser) {
			setSnackbarMsg(`New user ${newUser.user.userName} was created!`);
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} else {
			setSnackbarMsg(`Failed to create new user!`);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
		handleReset();
	};

	const handleSubmit = () => {
		const keys = Object.keys(userValue);
		const checkValue = (element) => userValue[element] === '';
		const emptyAttribute = keys.some(checkValue);
		if (emptyAttribute) {
			setError(
				`All fields are required! Please complete all fields in the form.`
			);
		} else {
			createNewUser();
		}
	};

	const handleReset = () =>
		setUserValue({
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			email: '',
			status: 'Junior',
		});

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
						Create new user
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
									id="userName"
									label="User name"
									name="userName"
									value={userValue.userName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="password"
									label="Password"
									name="password"
									value={userValue.password}
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
						<Button
							fullWidth
							onClick={handleReset}
							variant="contained"
							color="secondary"
							sx={{ mt: 3, mb: 2 }}
						>
							Reset
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

export default CreateUser;

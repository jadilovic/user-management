import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

export default function ConfirmDialog(props) {
	const { selectedUser, confirmOpen, setConfirmOpen, deleteUser } = props;

	const handleClose = () => {
		setConfirmOpen(false);
	};

	const handleYes = () => {
		deleteUser(selectedUser);
		setConfirmOpen(false);
	};

	return (
		<div>
			<Dialog open={confirmOpen} onClose={handleClose}>
				<DialogTitle>{'Delete User?'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Are you sure you want to delete this user?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="success" onClick={handleYes}>
						Yes
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={handleClose}
						autoFocus
					>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

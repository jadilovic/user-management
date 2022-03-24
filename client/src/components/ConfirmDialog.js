import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
						{`Are you sure you want to delete this user ${selectedUser.userName}?`}
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

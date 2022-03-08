import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function RequestsDetailsDialog({ _id, destination, isUpdated, setIsUpdated }) {
	const [open, setOpen] = useState(false);
	const [request, setRequest] = useState(null);

	console.log("destination", destination)

	const getRequest = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/requests/${_id}`);
			const oneRequest = response.data;
			setRequest(oneRequest);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log({request});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button size="small" variant="text" onClick={handleClickOpen}>
				See Details
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogActions>
					<Button onClick={handleClose}>
						<CancelIcon />
					</Button>
				</DialogActions>
				<DialogContent>
					<>
						{request && (
							<>
								<h3>{request.requestedBy.name} - {request.pax} pax </h3>
								<p><strong>Destination:</strong> {destination && destination.map((oneDestination) => (
									<span>{oneDestination}</span>
								))}</p>
								<p><strong>Start Date:</strong> {request.startDate}</p>
								<p><strong>End Date:</strong> {request.endDate}</p>
                				<p><strong>Occasion:</strong> {request.detailsOccasion}</p>
                				<p><strong>Special Request:</strong> {request.specialRequest}</p>
							</>
						)}
					</>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default RequestsDetailsDialog;

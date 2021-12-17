import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useState, useEffect } from 'react';



const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';


function RequestsDetailsDialog({type, _id, isUpdated, setIsUpdated}) {
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = useState(null);

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
  }, []);

  console.log(request);

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
          <Button onClick={handleClose}><CancelIcon /></Button>
        </DialogActions>
        <DialogContent>
        <>
            {request && (
                <p>{request._id}</p>
            )}
        </>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RequestsDetailsDialog
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddItem from './AddItem';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddItemDialog({type, id, isUpdated, setIsUpdated}) {
  const [open, setOpen] = useState(false);

  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="large" style={{justifyContent: "flex-start", width:'210px', margin: '5px 0'}} startIcon={<AddCircleIcon />} variant="outlined" onClick={handleClickOpen}>
        {typeCapitalized}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}><CancelIcon /></Button>
        </DialogActions>
        <DialogContent>
        <AddItem type={type} id={id} open={open} setOpen={setOpen} setIsUpdated={setIsUpdated} isUpdated={isUpdated}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddItemDialog
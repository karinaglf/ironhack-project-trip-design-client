import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddItem from './AddItem';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddItemDialog({type, id, isUpdated, setIsUpdated}) {
  const [open, setOpen] = React.useState(false);

  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="large" startIcon={<AddCircleIcon />} variant="outlined" onClick={handleClickOpen}>
        Add {typeCapitalized}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}><CancelIcon /></Button>
        </DialogActions>
        <DialogContent>
        <AddItem type={type} id={id} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddItemDialog
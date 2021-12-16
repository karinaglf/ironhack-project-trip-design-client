import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import EditItem from './EditItem';

function EditItemDialog({type, id, isUpdated, setIsUpdated}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" variant="text" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}><CancelIcon /></Button>
        </DialogActions>
        <DialogContent>
        <EditItem type={type} id={id} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditItemDialog

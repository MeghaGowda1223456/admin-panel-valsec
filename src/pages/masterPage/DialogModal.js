import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// eslint-disable-next-line react/prop-types
export default function DialogModal({ deleteModal, handleClickOpen, handleClose, handleDeleteClick }) {
  console.log(deleteModal);
  return (
    <div>
      <Dialog
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are You Sure You Want To Delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'gray' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} style={{ color: 'red' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

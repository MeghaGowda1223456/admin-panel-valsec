import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// eslint-disable-next-line import/no-unresolved
import { googleMeetScheduleService } from 'src/services/utils/admin/DashBoardServises';
import { CircularProgress } from '@mui/material';

export default function GooglemeetScheduleModal({
  deleteModal,
  handleClickOpen,
  handleClose,
  tableId,
  setGMeetScheduleModal,
  getTableData,
}) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [interviewLink, setInterviewLink] = useState('');

  const googleMeetSchedule = async () => {
    console.log('fghdfgdhfgdf');

    setIsLoading(true); // Start loading

    const message = await googleMeetScheduleService(tableId);
    console.log(message.data.status);

    if (message.data.status === 200) {
      setGMeetScheduleModal(false);
      getTableData();
    } else {
      alert(message.data.data);
      setGMeetScheduleModal(false);
    }

    setIsLoading(false); // Stop loading
  };

  // Function to copy text to clipboard using the Clipboard API
  // const copyToClipboard = (text) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       // Successfully copied to clipboard
  //     })
  //     .catch((error) => {
  //       console.error('Failed to copy to clipboard: ', error);
  //     });
  // };

  return (
    <div>
      <Dialog
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Schedule'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click Schedule Interview to Schedule an Interview.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#ff3300', border: '1px solid 	#ff3300' }}>
            Cancel
          </Button>
          <Button
            style={{ color: '#90EE90', border: '1px solid #90EE90' }}
            onClick={googleMeetSchedule}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

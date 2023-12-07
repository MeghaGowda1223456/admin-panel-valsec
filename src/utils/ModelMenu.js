import React, { useState } from 'react';
import Button from '@mui/material/Button';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ModelDialogTitle, { ModelDialog } from './ModelDialogTitle';

export default function ModelMenu(props) {
  const [open, setOpen] = useState(false);

  const { menuTitle, mainTitle, children } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button style={{ fontWeight: 'initial' }} sx={{ color: 'text.secondary' }} onClick={handleClickOpen}>
        {menuTitle}
      </Button>
      <ModelDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="700px">
        <ModelDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {mainTitle}
        </ModelDialogTitle>

        <TableContainer component={Paper}>
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              minWidth: 700,
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            {children}
          </Paper>
        </TableContainer>
      </ModelDialog>
    </>
  );
}

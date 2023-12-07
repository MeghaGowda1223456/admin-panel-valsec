/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

function ModalComponent({
  modalWidth = 750,
  createBtnName = 'Create',
  onCloseIconClick = () => {},
  children,
  childrenClassName,
  cancelBtnfun = () => {},
  createBtnFun = () => {},
  resetBtnfun = '',
  showFooter = true,
  showHeader = true,
  isModalOpen = true,
  btnName = 'Cancel',
  modalTitle = 'Create',
  endIcon,
  closable = true, // You can set this to true for a close button
  bodyStyle = { borderBottom: '10px solid #164888' },
  loading = false,
}) {
  return (
    <Dialog open={isModalOpen} onClose={onCloseIconClick} maxWidth="md" fullWidth>
      {showHeader && (
        <DialogTitle
          style={{
            borderBottom: '1px solid #E5ECFC',
            backgroundColor: '#164888',
            color: '#fff',
          }}
        >
          <label className="modal-title fw-600 ff-open-sans">{modalTitle}</label>
        </DialogTitle>
      )}

      <DialogContent>
        <Box className={childrenClassName}>{children}</Box>
      </DialogContent>

      {showFooter && (
        <DialogActions style={{ borderTop: '1px solid #E5ECFC' }}>
          <Button variant="contained" style={{ color: 'white', backgroundColor: '#d15b47' }} onClick={cancelBtnfun}>
            {btnName}
          </Button>
          {createBtnFun && (
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#1aa206' }} onClick={createBtnFun}>
              {loading ? (
                <Button>
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                </Button>
              ) : (
                createBtnName
              )}
            </Button>
          )}
          {resetBtnfun && (
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#1b6aaa' }} onClick={resetBtnfun}>
              Reset
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ModalComponent;

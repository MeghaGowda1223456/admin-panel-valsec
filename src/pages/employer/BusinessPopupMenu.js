import { MenuItem, Popover } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Iconify from '../../components/iconify';
import BusinessDetails from './BusinessDetails';
import ModelMenu from '../../utils/ModelMenu';

export default function BusinessPopupMenu(props) {
  const business = props.business;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToStoremanager = () => navigate(`/dashboard/storemanagers/${business.businessId}`);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover
      open={Boolean(props.open)}
      anchorEl={props.open}
      onClose={props.handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 170,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem>
        <Iconify icon={'mdi:information-variant-circle'} sx={{ mr: 2 }} />

        <ModelMenu menuTitle="More Details" mainTitle="Business Details">
          <BusinessDetails business={business} />
        </ModelMenu>
      </MenuItem>
      <MenuItem onClick={navigateToStoremanager}>
        <Iconify icon={'material-symbols:add-business-rounded'} sx={{ mr: 2 }} />
        Store Managers
      </MenuItem>
    </Popover>
  );
}

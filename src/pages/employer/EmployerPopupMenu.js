import { MenuItem, Popover } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify';

export default function EmployerPopupMenu(props) {
  const employer = props.employer;
  const navigate = useNavigate();

  const navigateToBusiness = () => navigate(`/dashboard/business/${employer.employerId}`);
  const navigateToJobs = () => navigate(`/dashboard/jobs/${employer.employerId}`);

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
          width: 140,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={navigateToJobs}>
        <Iconify icon={'ic:round-business-center'} sx={{ mr: 2 }} />
        Job Posted
      </MenuItem>
      <MenuItem onClick={navigateToBusiness}>
        <Iconify icon={'material-symbols:add-business-rounded'} sx={{ mr: 2 }} />
        Businesses
      </MenuItem>

      <MenuItem onClick={props.onChangeActivationStatus}>
        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
        {employer.active ? 'Deactivate' : 'Activate'}
      </MenuItem>
      {!employer.deleted && (
        <MenuItem sx={{ color: 'error.main' }} onClick={props.onDeleteEmployer}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      )}
    </Popover>
  );
}

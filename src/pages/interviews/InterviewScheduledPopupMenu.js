import { Button, MenuItem, Popover } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Iconify from '../../components/iconify';
import MoreBusinessDetails from '../employer/BusinessDetails';
import ModelMenu from '../../utils/ModelMenu';
import CandidateInfo from '../Candidates/CandidateInfo';
import InterviewForm from './InterviewForm';

export default function InterviewScheduledPopupMenu(props) {
  const candidate = props.candidate;
  const interviewMode = props.interviewMode;
  const matchId = props.matchId;
  const interviewArrangedByAdmin = props.interviewArrangedByAdmin;
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
        <ModelMenu menuTitle="More Details" mainTitle="Candidate Information">
          <CandidateInfo candidate={candidate} />
        </ModelMenu>
      </MenuItem>

      {interviewMode === 'ONLINE_CONFERENCE' && !interviewArrangedByAdmin && (
        <MenuItem>
          <Iconify icon={'mdi:virtual-meeting'} sx={{ mr: 2 }} />
          <ModelMenu menuTitle="Arrange Meeting" mainTitle="Google Meeting">
            <InterviewForm matchId={matchId} />
          </ModelMenu>
        </MenuItem>
      )}
    </Popover>
  );
}

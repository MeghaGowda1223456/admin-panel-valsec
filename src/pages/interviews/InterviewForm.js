import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  FormControl,
  Snackbar,
} from '@mui/material';
import { TimePicker } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const arrangeGoogleMeetURL = '/admin/arrangeGoogleMeet';

export default function InterviewForm(props) {
  const matchId = props.matchId;
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [validationEndTimeError, setValidationEndTimeError] = useState('');

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { auth } = useAuth();
  const [showMessage, setShowMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCloseMessage = () => {
    setShowMessage('');
  };

  useEffect(() => {
    setShowMessage('');
    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const currentHours = currentDate.getHours();

    const startMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    const startHours = currentHours < 10 ? `0${currentHours}` : currentHours;

    const currentTime = `${startHours}:${startMinutes}`;

    setStartTime(currentTime);

    setEndTime(currentTime);
  }, []);

  const handleAddEmail = () => {
    const trimmedEmail = email.trim();
    if (trimmedEmail !== '' && !emailsList.includes(trimmedEmail)) {
      if (isValidEmail(trimmedEmail)) {
        setEmailsList([...emailsList, trimmedEmail]);
        setEmail('');
        setValidationError('');
      } else {
        setValidationError('Invalid email');
      }
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDeleteEmail = (email) => {
    setEmailsList(emailsList.filter((e) => e !== email));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the email list to the server or another component
    console.log(emailsList);

    const mergedStartDate = new Date(`${date}T${startTime}`).toISOString();
    const mergedEndDate = new Date(`${date}T${endTime}`).toISOString();

    console.log('mergedStartDate ', mergedStartDate);
    console.log('mergedEndDate ', mergedEndDate);
    if (emailsList && emailsList.length < 2) {
      setValidationError('Provide atleast 2 email ids');
    } else if (mergedEndDate <= mergedStartDate) {
      setValidationEndTimeError('End time should be greater than start time');
    } else {
      axios
        .post(
          arrangeGoogleMeetURL,
          { emails: emailsList, startTime: mergedStartDate, endTime: mergedEndDate, matchId },
          {
            headers: {
              Authorization: 'bearer '.concat(auth?.accessToken),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setEmail('');
          setEmailsList([]);
          setEmailsList([]);
          const currentDate = new Date();
          const currentMinutes = currentDate.getMinutes();
          const currentHours = currentDate.getHours();

          const startMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
          const startHours = currentHours < 10 ? `0${currentHours}` : currentHours;

          const currentTime = `${startHours}:${startMinutes}`;
          setStartTime(currentTime);

          setEndTime(currentTime);
          setDate(new Date().toISOString().slice(0, 10));
          setShowMessage('Successfully created google meet');
        })
        .catch(() => {
          setShowMessage('Something went wrong , please try after some time');
        });
    }
  };
  return (
    <>
      {showMessage !== null && showMessage !== '' ? (
        <div>{showMessage}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={validationError !== ''}
                helperText={validationError}
                sx={{ marginBottom: '5px' }}
              />
              <Button
                variant="contained"
                onClick={handleAddEmail}
                sx={{
                  bgcolor: '#001357',
                  '&:hover': {
                    bgcolor: '#001357',
                  },
                }}
              >
                Add
              </Button>
              <List>
                {emailsList.map((email, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={email} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEmail(email)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="date"
                name="date"
                label="Date"
                type="date"
                value={date}
                inputProps={{
                  min: date,
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="start-time"
                  name="start-time"
                  label="Start Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="end-time"
                  name="end-time"
                  label="End Time"
                  type="time"
                  error={validationEndTimeError !== ''}
                  helperText={validationEndTimeError}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#001357',
                  '&:hover': {
                    bgcolor: '#001357',
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}

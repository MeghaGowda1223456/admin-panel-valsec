import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BusinessDetails(data) {
  const [open, setOpen] = useState(false);
  const business = data.business;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {business.brandImage && (
        <DialogContent dividers>
          <Typography align="center">
            <Box
              component="span"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.54)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.54)',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              al
            >
              <ImageList>
                <ImageListItem>
                  <input
                    type="image"
                    src={`data:image/jpeg;base64,${business.brandImage}`}
                    alt="brand image"
                    height={150}
                  />
                  <ImageListItemBar
                    subtitle={business.actualFileName}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${business.actualFileName}`}
                      />
                    }
                  />
                </ImageListItem>
              </ImageList>
            </Box>
          </Typography>
        </DialogContent>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Legal business name
              </StyledTableCell>
              <StyledTableCell align="center">{business.legalBusinessName}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Operational business name
              </StyledTableCell>
              <StyledTableCell align="center">{business.opBusinessName}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Auth person name
              </StyledTableCell>
              <StyledTableCell align="center">{business.authPersonName}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Auth person contact
              </StyledTableCell>
              <StyledTableCell align="center">{business.authPersonContact}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Business Email
              </StyledTableCell>
              <StyledTableCell align="center">{business.businessEmail}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="left" sx={{ fontWeight: 'bold' }}>
                Industries
              </StyledTableCell>
              <StyledTableCell align="center">
                {business.industries &&
                  business.industries.map((row) => {
                    return ' '.concat(row.industryName);
                  })}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" align="center" sx={{ fontWeight: 'bold' }} colSpan="2">
                Address
              </StyledTableCell>
              <StyledTableCell align="center" colSpan="2">
                {business.addrL1}{' '}
                {business.addrL2 !== null && business.addrL2 !== '' ? ','.concat(business.addrL2) : ''},{business.city}{' '}
                ,{business.province} ,{business.postcode}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

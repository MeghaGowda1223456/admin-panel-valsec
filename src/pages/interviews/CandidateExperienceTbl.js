import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { sentenceCase } from 'change-case';
import Label from '../../components/label/Label';

function createData(name, calories, fat, carbs, protein, worked) {
  return { name, calories, fat, carbs, protein, worked };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 'Yes'),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 'Yes'),
  createData('Eclair', 262, 16.0, 24, 6.0, 'Yes'),
  createData('Cupcake', 305, 3.7, 67, 4.3, 'Yes'),
  createData('fdfd', 305, 3.7, 67, 4.3, 'Yes'),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 'Yes'),
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#001357',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CandidateExperienceTbl(props) {
  const candidate = props.candidate;

  return (
    <>
      <Grid item xs>
        <Typography variant="subtitle1" component="div">
          Experience info:
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" component="div">
          Total Experience: {candidate.yoe ? candidate.yoe : 0} Years
        </Typography>
      </Grid>
      <Grid item xs>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell align="right">Designation</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">End Date</StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Worked In Canada</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidate.candidateExperiences &&
                candidate.candidateExperiences.map((row) => (
                  <StyledTableRow key={row.experienceId}>
                    <StyledTableCell component="th" scope="row">
                      {row.companyName}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.designation}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2" noWrap>
                        {'0'.concat(row.startMonth).slice(-2)}-{row.startYear}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2" noWrap>
                        {'0'.concat(row.endMonth).slice(-2)}-{row.endYear}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.province ? row.province : row.country}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Label color={row.workedInCanada ? 'success' : 'warning'}>
                        {sentenceCase(row.workedInCanada ? 'YES' : 'NO')}
                      </Label>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

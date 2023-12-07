import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Avatar,
  Divider,
} from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import InterviewScheduledPopupMenu from './InterviewScheduledPopupMenu';
import { fDate } from '../../utils/formatTime';
import Label from '../../components/label';

// ----------------------------------------------------------------------
const interviewScheduledURL = '/admin/fetchInterviewScheduledCandidates';

const TABLE_HEAD = [
  { id: 'candidateName', label: 'Name', alignRight: false },
  { id: 'contactNumber', label: 'Contact Number', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'interviewMode', label: 'Interview Mode', alignRight: false },
  { id: 'startTime', label: 'Interview Start Time', alignRight: false },
  { id: 'duration', label: 'Interview Duration', alignRight: false },
  { id: 'scheduledByAdmin', label: 'Scheduled By Admin', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.candidateName != null && _user.candidateName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function InterviewScheduledPage() {
  const [candidateInfo, setCandidateInfo] = useState([]);

  const [menuOpenedFor, setMenuOpenedFor] = useState([]);

  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get(interviewScheduledURL, {
        headers: { Authorization: 'bearer '.concat(auth?.accessToken) },
      })
      .then((response) => {
        setLoading(true);
        setCandidateInfo(response?.data);
      })
      .catch(() => {
        setLoading(true);
        setCandidateInfo([]);
      });
  }, []);

  const handleOpenMenu = (event, candidateInfo) => {
    setOpen(event.currentTarget);
    console.log('candidate....... ', candidateInfo);
    setMenuOpenedFor(candidateInfo);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setMenuOpenedFor([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  if (!loading) {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - candidateInfo.length) : 0;

    const filteredUsers = applySortFilter(candidateInfo, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;
    return (
      <>
        <Helmet>
          <title> Business | Tempx UI </title>
        </Helmet>

        <Container>
          <Card>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
                placeHolder="Search Candidate"
              />
            </Stack>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={candidateInfo.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { candidateName, contactNumber, email } = row.candidate;
                      const {
                        matchId,
                        interviewMode,
                        interviewStartDate,
                        interviewDuration,
                        interviewArrangedByAdmin,
                      } = row;

                      return (
                        <TableRow hover key={matchId} tabIndex={-1}>
                          <TableCell component="th" scope="row" align="center">
                            {candidateName}
                          </TableCell>

                          <TableCell align="center">
                            {contactNumber !== null && contactNumber !== '' ? contactNumber : '-'}
                          </TableCell>
                          <TableCell align="center">{email !== null && email !== '' ? email : '-'}</TableCell>

                          <TableCell align="center">
                            <Label color={interviewMode === 'ONLINE_CONFERENCE' ? 'success' : 'default'}>
                              {sentenceCase(
                                interviewMode === 'ONLINE_CONFERENCE' ? 'Online Meeting' : 'In-Person Meeting'
                              )}
                            </Label>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" noWrap>
                              {interviewStartDate}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">{interviewDuration}</TableCell>

                          <TableCell align="center">{interviewArrangedByAdmin ? 'YES' : 'NO'}</TableCell>
                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {candidateInfo.length === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for selected filters;
                              <br /> Try changing filters.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={candidateInfo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <InterviewScheduledPopupMenu
              candidate={menuOpenedFor.candidate}
              open={open}
              handleClose={handleCloseMenu}
              interviewMode={menuOpenedFor.interviewMode}
              interviewArrangedByAdmin={menuOpenedFor.interviewArrangedByAdmin}
              matchId={menuOpenedFor.matchId}
            />
          </Card>
        </Container>
      </>
    );
  }
  return <div>Loading...</div>;
}

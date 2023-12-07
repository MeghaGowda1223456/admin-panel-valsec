import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';

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
import BusinessPopupMenu from './BusinessPopupMenu';

// ----------------------------------------------------------------------
const businessListURL = '/admin/fetchEmployerBusinesses';

const TABLE_HEAD = [
  { id: 'legalBusinessName', label: 'Name', alignRight: false },
  { id: 'businessEmail', label: 'Email', alignRight: false },
  { id: 'craNumber', label: 'CRA Number', alignRight: false },
  { id: 'storeCount', label: 'Store Count', alignRight: false },
  { id: 'isDeleted', label: 'Deleted', alignRight: false },

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
      (_user) =>
        _user.legalBusinessName != null && _user.legalBusinessName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function BusinessList() {
  const { employerId } = useParams();
  const [businesses, setBusinesses] = useState([]);
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
      .get(businessListURL, {
        params: { employerId },
        headers: { Authorization: 'bearer '.concat(auth?.accessToken) },
      })
      .then((response) => {
        setLoading(true);
        setBusinesses(response?.data);
      })
      .catch(() => {
        setLoading(true);
        setBusinesses([]);
      });
  }, []);

  const handleOpenMenu = (event, business) => {
    setOpen(event.currentTarget);
    console.log('busines....... ', business);
    setMenuOpenedFor(business);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = businesses.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  if (loading) {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - businesses.length) : 0;

    const filteredUsers = applySortFilter(businesses, getComparator(order, orderBy), filterName);

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
                placeHolder="Search Business"
              />
            </Stack>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={businesses.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { businessId, legalBusinessName, businessEmail, craNumber, storeCount, deleted } = row;

                      return (
                        <TableRow hover key={businessId} tabIndex={-1}>
                          <TableCell component="th" scope="row" align="center">
                            {legalBusinessName}
                          </TableCell>

                          <TableCell align="center">
                            {businessEmail !== null && businessEmail !== '' ? businessEmail : '-'}
                          </TableCell>
                          <TableCell align="center">
                            {craNumber !== null && craNumber !== '' ? craNumber : '-'}
                          </TableCell>
                          <TableCell align="center">{storeCount !== null ? storeCount : 0}</TableCell>

                          <TableCell align="center">{deleted ? 'Yes' : 'No'}</TableCell>
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

                  {businesses.length === 0 && (
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
              count={businesses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <BusinessPopupMenu business={menuOpenedFor} open={open} handleClose={handleCloseMenu} />
          </Card>
        </Container>
      </>
    );
  }
  return <div>Loading...</div>;
}

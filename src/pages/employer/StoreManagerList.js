// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';

// // @mui
// import {
//   Card,
//   Table,
//   Stack,
//   Paper,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   TablePagination,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import Scrollbar from '../../components/scrollbar';
// // sections
// import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// // mock
// import axios from '../../api/axios';
// import useAuth from '../../hooks/useAuth';

// // ----------------------------------------------------------------------
// const storeManagerlistURL = '/admin/fetchStoreManagers';

// const TABLE_HEAD = [
//   { id: 'managerName', label: 'Manager Name', alignRight: false },
//   { id: 'email', label: 'Email', alignRight: false },
//   { id: 'contactNumber', label: 'Contact Number', alignRight: false },
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (_user) => _user.managerName != null && _user.managerName.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }
// export default function StoreManagerList() {
//   const { businessId } = useParams();
//   const [storemanagers, setStoremanagers] = useState([]);

//   const { auth } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     axios
//       .get(storeManagerlistURL, {
//         params: { businessId },
//         headers: { Authorization: 'bearer '.concat(auth?.accessToken) },
//       })
//       .then((response) => {
//         setLoading(true);
//         setStoremanagers(response?.data);
//       })
//       .catch(() => {
//         setLoading(true);
//         setStoremanagers([]);
//       });
//   }, []);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = storemanagers.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   if (loading) {
//     const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - storemanagers.length) : 0;

//     const filteredUsers = applySortFilter(storemanagers, getComparator(order, orderBy), filterName);

//     const isNotFound = !filteredUsers.length && !!filterName;
//     return (
//       <>
//         <Helmet>
//           <title> Jobs | Tempx UI </title>
//         </Helmet>

//         <Container>
//           <Card>
//             <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
//               <UserListToolbar
//                 numSelected={selected.length}
//                 filterName={filterName}
//                 onFilterName={handleFilterByName}
//                 placeHolder="Search Store Managers"
//               />
//             </Stack>
//             <Scrollbar>
//               <TableContainer sx={{ minWidth: 800 }}>
//                 <Table>
//                   <UserListHead
//                     order={order}
//                     orderBy={orderBy}
//                     headLabel={TABLE_HEAD}
//                     rowCount={storemanagers.length}
//                     numSelected={selected.length}
//                     onRequestSort={handleRequestSort}
//                     onSelectAllClick={handleSelectAllClick}
//                   />

//                   <TableBody>
//                     {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                       const { storeManagerId, managerName, email, contactNumber } = row;

//                       return (
//                         <TableRow hover key={storeManagerId} tabIndex={-1}>
//                           <TableCell component="th" scope="row" align="center">
//                             <Stack direction="row" alignItems="center" spacing={2}>
//                               <Avatar alt={managerName} src="/assets/images/avatars/employer_avatar.png" />
//                               <Typography variant="subtitle2" noWrap>
//                                 {managerName}
//                               </Typography>
//                             </Stack>
//                           </TableCell>
//                           <TableCell align="center">{email !== null && email !== '' ? email : '-'}</TableCell>
//                           <TableCell align="center">
//                             {contactNumber !== null && contactNumber !== '' ? contactNumber : '-'}
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                     {emptyRows > 0 && (
//                       <TableRow style={{ height: 53 * emptyRows }}>
//                         <TableCell colSpan={6} />
//                       </TableRow>
//                     )}
//                   </TableBody>

//                   {storemanagers.length === 0 && (
//                     <TableBody>
//                       <TableRow>
//                         <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                           <Paper
//                             sx={{
//                               textAlign: 'center',
//                             }}
//                           >
//                             <Typography variant="h6" paragraph>
//                               Not found
//                             </Typography>

//                             <Typography variant="body2">
//                               No results found for selected filters;
//                               <br /> Try changing filters.
//                             </Typography>
//                           </Paper>
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   )}
//                   {isNotFound && (
//                     <TableBody>
//                       <TableRow>
//                         <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                           <Paper
//                             sx={{
//                               textAlign: 'center',
//                             }}
//                           >
//                             <Typography variant="h6" paragraph>
//                               Not found
//                             </Typography>

//                             <Typography variant="body2">
//                               No results found for &nbsp;
//                               <strong>&quot;{filterName}&quot;</strong>.
//                               <br /> Try checking for typos or using complete words.
//                             </Typography>
//                           </Paper>
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   )}
//                 </Table>
//               </TableContainer>
//             </Scrollbar>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={storemanagers.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Card>
//         </Container>
//       </>
//     );
//   }
//   return <div>Loading...</div>;
// }

import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import TableComponent from 'src/components/tablecomponent/TableComponent';
// eslint-disable-next-line import/no-unresolved
import CONSTANTS from 'src/constants';
// eslint-disable-next-line import/no-unresolved
import { storeManagerGetData } from 'src/services/utils/admin/StoreManagers';
// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved

const StoreManagerList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const getTableData = async () => {
    try {
      const { data } = await storeManagerGetData();
      console.log(data);
      if (data) {
        const arrayOfRows = data.map((item) => ({
          col1: item?.store_manager_id ? item.store_manager_id : '---',
          col2: item?.managerName ? item?.managerName : '---',
          col3: item?.email ? item?.email : '---',
          col4: item?.contact ? item?.contact : '---',
          col5: item?.employerName ? item?.employerName : '---',
          // col6: item.deleted === false ? 'No' : 'Yes',
          col6: item.active === '0' ? 'No' : 'Yes',
        }));

        setRows(arrayOfRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {' '}
          <CircularProgress />
        </div>
      ) : (
        <TableComponent data={rows} columns={CONSTANTS.STOREMANAGER_HEADERS} />
      )}
    </div>
  );
};

export default StoreManagerList;

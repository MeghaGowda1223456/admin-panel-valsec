// // import React, { useEffect, useState } from 'react';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   TextField,
// //   Box,
// //   Typography,
// // } from '@mui/material';
// // import { messageService } from '../../services/rxjsServices/index';

// // const TableComponent = ({ data = [], columns = [], numberOfItem }) => {
// //   console.log(data);
// //   const [searchText, setSearchText] = useState('');
// //   const [rows, setRows] = useState(data);

// //   useEffect(() => {
// //     requestSearch(searchText);
// //   }, [searchText]);

// //   useEffect(() => {
// //     const subscription = messageService.getMessage().subscribe((val) => {
// //       setSearchText(val);
// //     });
// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, []);

// //   const requestSearch = (searchVal) => {
// //     if (searchVal) {
// //       const filterData = data.filter((item) => {
// //         return Object.values(item).join('').toLowerCase().includes(searchVal.toLowerCase());
// //       });
// //       setRows(filterData);
// //     } else {
// //       setRows(data);
// //     }
// //   };

// //   return (
// //     <>
// //       {' '}
// //       <TextField
// //         label="Search"
// //         variant="outlined"
// //         fullWidth
// //         value={searchText}
// //         onChange={(e) => setSearchText(e.target.value)}
// //         style={{ marginTop: '2%' }}
// //       />
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               {columns?.map((column, index) => (
// //                 <TableCell style={{ width: column.width }} key={index} sx={{ textAlign: 'center' }}>
// //                   {column.title}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {/* ghhghgh */}
// //             {rows.length > 0 ? (
// //               rows?.map((row, rowIndex) => (
// //                 <TableRow key={rowIndex}>
// //                   {columns.map((column, colIndex) => (
// //                     <TableCell style={{ width: column.width }} key={colIndex} sx={{ textAlign: 'center' }}>
// //                       {row[column.dataIndex]}
// //                     </TableCell>
// //                   ))}
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell colSpan={columns.length}>
// //                   <Box textAlign="center" py={3}>
// //                     <Typography variant="body1">No Data Found</Typography>
// //                   </Box>
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </>
// //   );
// // };

// // export default TableComponent;
// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Box,
//   Typography,
//   Button,
// } from '@mui/material';
// import { messageService } from '../../services/rxjsServices/index';

// const TableComponent = ({ data = [], columns = [], numberOfItem }) => {
//   console.log(data);
//   const [searchText, setSearchText] = useState('');
//   const [rows, setRows] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5; // Adjust this as needed

//   useEffect(() => {
//     requestSearch(searchText);
//   }, [searchText]);

//   useEffect(() => {
//     const subscription = messageService.getMessage().subscribe((val) => {
//       setSearchText(val);
//     });
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const requestSearch = (searchVal) => {
//     if (searchVal) {
//       const filterData = data.filter((item) => {
//         return Object.values(item).join('').toLowerCase().includes(searchVal.toLowerCase());
//       });
//       setRows(filterData);
//       setCurrentPage(1); // Reset to the first page when searching
//     } else {
//       setRows(data);
//     }
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <>
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         style={{ marginTop: '2%', marginBottom: '2%' }}
//         autoComplete="off"
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns?.map((column, index) => (
//                 <TableCell style={{ width: column.width }} key={index} sx={{ textAlign: 'center' }}>
//                   {column.title}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentRows.length > 0 ? (
//               currentRows?.map((row, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   {columns.map((column, colIndex) => (
//                     <TableCell style={{ width: column.width }} key={colIndex} sx={{ textAlign: 'center' }}>
//                       {row[column.dataIndex]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length}>
//                   <Box textAlign="center" py={3}>
//                     <Typography variant="body1">No Data Found</Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         <Box display="flex" justifyContent="center" mt={'2%'} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
//           {data.length > rowsPerPage && (
//             <Button variant="outlined" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               Previous Page
//             </Button>
//           )}
//           {data.length > rowsPerPage && (
//             <Button
//               variant="outlined"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={indexOfLastRow >= data.length}
//             >
//               Next Page
//             </Button>
//           )}
//         </Box>
//       </TableContainer>
//     </>
//   );
// };

// export default TableComponent;
// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Box,
//   Typography,
//   Button,
// } from '@mui/material';
// import { messageService } from '../../services/rxjsServices/index';

// const TableComponent = ({ data = [], columns = [], numberOfItem }) => {
//   const [searchText, setSearchText] = useState('');
//   const [rows, setRows] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5; // Adjust this as needed

//   // Check if current page is stored in local storage, and use it if available
//   useEffect(() => {
//     const storedPage = localStorage.getItem('currentPage');
//     if (storedPage) {
//       setCurrentPage(parseInt(storedPage, 10));
//     }
//   }, []);

//   useEffect(() => {
//     requestSearch(searchText);
//   }, [searchText]);

//   useEffect(() => {
//     const subscription = messageService.getMessage().subscribe((val) => {
//       setSearchText(val);
//     });
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     // Store the current page in local storage whenever it changes
//     localStorage.setItem('currentPage', currentPage);
//   }, [currentPage]);

//   const requestSearch = (searchVal) => {
//     if (searchVal) {
//       const filterData = data.filter((item) => {
//         return Object.values(item).join('').toLowerCase().includes(searchVal.toLowerCase());
//       });
//       setRows(filterData);
//       setCurrentPage(1); // Reset to the first page when searching
//     } else {
//       setRows(data);
//     }
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <>
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         style={{ marginTop: '2%', marginBottom: '2%' }}
//         autoComplete="off"
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns?.map((column, index) => (
//                 <TableCell style={{ width: column.width }} key={index} sx={{ textAlign: 'center' }}>
//                   {column.title}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentRows.length > 0 ? (
//               currentRows?.map((row, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   {columns.map((column, colIndex) => (
//                     <TableCell style={{ width: column.width }} key={colIndex} sx={{ textAlign: 'center' }}>
//                       {row[column.dataIndex]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length}>
//                   <Box textAlign="center" py={3}>
//                     <Typography variant="body1">No Data Found</Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         <Box display="flex" justifyContent="center" mt={'2%'} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
//           {data.length > rowsPerPage && (
//             <Button variant="outlined" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               Previous Page
//             </Button>
//           )}
//           {data.length > rowsPerPage && (
//             <Button
//               variant="outlined"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={indexOfLastRow >= data.length}
//             >
//               Next Page
//             </Button>
//           )}
//         </Box>
//       </TableContainer>
//     </>
//   );
// };

// export default TableComponent;
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { messageService } from '../../services/rxjsServices/index';

const TableComponent = ({ data = [], columns = [], numberOfItem }) => {
  console.log(data);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Adjust this as needed

  // Check if current page is stored in local storage, and use it if available
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  useEffect(() => {
    requestSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    const subscription = messageService.getMessage().subscribe((val) => {
      setSearchText(val);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('currentPage'); // Remove currentPage from local storage
      setCurrentPage(1); // Reset currentPage to 1
    };
  }, []);
  useEffect(() => {
    // Store the current page in local storage whenever it changes
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const requestSearch = (searchVal) => {
    if (searchVal) {
      const filterData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchVal.toLowerCase());
      });
      setRows(filterData);
      setCurrentPage(1); // Reset to the first page when searching
    } else {
      setRows(data);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginTop: '2%', marginBottom: '2%' }}
        autoComplete="off"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell style={{ width: column.width }} key={index} sx={{ textAlign: 'center' }}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows?.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell style={{ width: column.width }} key={colIndex} sx={{ textAlign: 'center' }}>
                      {row[column.dataIndex]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box textAlign="center" py={3}>
                    <Typography variant="body1">No Data Found</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" mt={'2%'} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {data.length > rowsPerPage && (
            <Button variant="outlined" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </Button>
          )}
          <Typography variant="body1">
            Page {currentPage} of {totalPages}
          </Typography>
          {data.length > rowsPerPage && (
            <Button
              variant="outlined"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next Page
            </Button>
          )}
        </Box>
      </TableContainer>
    </>
  );
};

export default TableComponent;

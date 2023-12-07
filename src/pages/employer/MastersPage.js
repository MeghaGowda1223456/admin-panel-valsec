// import { CircularProgress } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// // eslint-disable-next-line import/no-unresolved
// import TableComponent from 'src/components/tablecomponent/TableComponent'
// // eslint-disable-next-line import/no-unresolved
// import CONSTANTS from 'src/constants'
// // eslint-disable-next-line import/no-unresolved
// import { employerGetData } from 'src/services/utils/admin/EmployerServises';

// const EmployerPage = () => {
//   const [rows, setRows] = useState([]);
// const [loading,setLoading]=useState(false)
//   const getTableData = async () => {
//     const { data } = await employerGetData();
//     console.log(data);
//     if (data) {
//       const arrayOfRows = [];
//       // eslint-disable-next-line no-unused-expressions
//       data &&
//         // eslint-disable-next-line array-callback-return
//         data.map((item, index) => {

//           arrayOfRows.push({
//             col1:item?.employer_id,
//             col2: item?.emplioyerName,
//             col3: item?.email,
//             col4: item?.countryCode,
//             col5: item?.employerContact,
//             col6: item?.isDeleted,

//           });
//         });
//       setRows(arrayOfRows);
//     }
//   };

//   useEffect(()=>{getTableData()},[])
//   return (
//     <div>
//      {loading?<CircularProgress />:    <TableComponent
//         data={rows}
//         columns={CONSTANTS.EMPLOYEE_HEADERS}
//         // numberOfItem={numberOfItem}
//       />}
//     </div>
//   )
// }

// export default EmployerPage
import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import TableComponent from 'src/components/tablecomponent/TableComponent';
// eslint-disable-next-line import/no-unresolved
import CONSTANTS from 'src/constants';
// eslint-disable-next-line import/no-unresolved
import { employerGetData } from 'src/services/utils/admin/EmployerServises';
// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved

const MastersPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const getTableData = async () => {
    try {
      const { data } = await employerGetData();
      console.log(data);
      if (data) {
        const arrayOfRows = data.map((item) => ({
          col1: item?.employer_id ? item?.employer_id : '---',
          col2: item?.employerName ? item?.employerName : '---',
          col3: item?.email ? item?.email : '---',
          col4: item?.employerContact ? item?.employerContact : '---',
          col5: item.isDeleted === 0 ? 'No' : 'Yes',
          col6: item.active === 0 ? 'No' : 'Yes',
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
      <Button>create</Button>
      {loading ? <CircularProgress /> : <TableComponent data={rows} columns={CONSTANTS.EMPLOYEE_HEADERS} />}
    </div>
  );
};

export default MastersPage;

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
import { masterBusinessDelete, masterBusinessGetAll } from 'src/services/utils/admin/MasterServises';
// eslint-disable-next-line import/no-unresolved
import EditIcon from '@mui/icons-material/Edit';
// eslint-disable-next-line import/no-unresolved
import DeleteIcon from '@mui/icons-material/Delete';
import DialogModal from './DialogModal';
// eslint-disable-next-line import/order, import/no-unresolved
import MasterBussinessModal from 'src/components/forms/MasterBusinessModal';

const MastersBusinessPage = () => {
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableId, setTableId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({});
  const [modalValue, setModalValue] = useState('add');
  const handleEditClick = (data) => {
    setModalOpen(true);
    setDefaultFormData(data);
    setModalValue('edit');
  };
  const getTableData = async () => {
    setLoading(true);
    try {
      const { data } = await masterBusinessGetAll();
      console.log(data.data);
      localStorage.setItem('businessid', JSON.stringify(data.data));
      if (data) {
        const arrayOfRows = data.data.map((item) => ({
          // col1: item?.businessId,
          col1: item?.legalBusinessName ? item?.legalBusinessName : '---',
          col2: item?.city ? item?.city : '---',
          col3: item?.postcode ? item?.postcode : '---',
          col4: item.businessEmail !== 'NULL' ? item.businessEmail : '---',
          col5: item?.craNumber ? item?.craNumber : '---',
          col6: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button>
                <EditIcon
                  onClick={() => {
                    handleEditClick(item);
                  }}
                />
              </Button>
              <Button
                onClick={() => {
                  setDeleteModal(true);
                  setTableId(item.businessId);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ),
        }));

        setRows(arrayOfRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };
  // const deleteTableData = async () => {
  //   console.log('fghdfgdhfgdf');
  //   setLoading(true);
  //   const { message } = await masterBusinessDelete(tableId);
  //   setDeleteModal(false);
  //   getTableData();
  //   setRows([]);
  // };
  const deleteTableData = async () => {
    try {
      console.log('fghdfgdhfgdf');
      setLoading(true); // Set loading to true when the operation starts
      const { message } = await masterBusinessDelete(tableId);
      setDeleteModal(false);
      getTableData();
    } catch (error) {
      console.error('An error occurred:', error);
      // You can add error handling code here, such as displaying an error message to the user.
    } finally {
      setLoading(false); // Set loading to false when the operation completes (succeeds or fails)
    }
  };

  useEffect(() => {
    if (!rows) {
      getTableData();
    }
  }, [rows]);

  return (
    <div>
      {!loading && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button
            variant="contained"
            onClick={() => {
              setModalOpen(true);
              setModalValue('add');
            }}
          >
            Create
          </Button>
        </div>
      )}
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableComponent data={rows || []} columns={CONSTANTS.MASTER_BUSSINESS_HEADERS} />
      )}
      {deleteModal && (
        <DialogModal
          deleteModal={deleteModal}
          handleClose={() => {
            setDeleteModal(false);
          }}
          handleDeleteClick={() => {
            console.log('fghdfghdfg');
            deleteTableData();
          }}
        />
      )}
      {modalOpen && (
        <MasterBussinessModal
          setModalOpen={setModalOpen}
          getTableData={getTableData}
          defaultFormData={defaultFormData}
          modalValue={modalValue}
        />
      )}
    </div>
  );
};

export default MastersBusinessPage;

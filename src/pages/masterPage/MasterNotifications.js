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
import {
  masterBusinessDelete,
  masterBusinessGetAll,
  masterNotificationDelete,
  masterNotificationsGetAll,
  // eslint-disable-next-line import/no-unresolved
} from 'src/services/utils/admin/MasterServises';
// eslint-disable-next-line import/no-unresolved
import EditIcon from '@mui/icons-material/Edit';
// eslint-disable-next-line import/no-unresolved
import DeleteIcon from '@mui/icons-material/Delete';
import DialogModal from './DialogModal';
// eslint-disable-next-line import/order, import/no-unresolved
import MasterNotificationModal from 'src/components/forms/MasterNotificationModal';

const MastersNotificationPage = () => {
  const [rows, setRows] = useState([]);
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
      const { data } = await masterNotificationsGetAll();
      console.log(data.data);
      if (data) {
        const arrayOfRows = data.data.map((item) => ({
          col1: item?.notification_template_id,
          col2: item?.message ? item?.message : '---',
          col3: item?.templateType ? item?.templateType : '---',
          // col4: item?.transactionDate ? item?.transactionDate : '---',
          col4: item.userId ? item.userId : '---',
          col5: item?.userType ? item?.userType : '---',
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
                  setTableId(item.notification_template_id);
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
  const deleteTableData = async () => {
    try {
      console.log('fghdfgdhfgdf');
      const { message } = await masterNotificationDelete(tableId);
      getTableData();
      setDeleteModal(false);
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error or display an error message to the user.
    }
  };
  useEffect(() => {
    getTableData();
  }, []);

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
        <TableComponent data={rows} columns={CONSTANTS.MASTER_NOTIFICATIONS_HEADERS} />
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
        <MasterNotificationModal
          setModalOpen={setModalOpen}
          getTableData={getTableData}
          defaultFormData={defaultFormData}
          modalValue={modalValue}
        />
      )}
    </div>
  );
};

export default MastersNotificationPage;

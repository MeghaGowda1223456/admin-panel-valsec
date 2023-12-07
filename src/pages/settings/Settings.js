import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import TableComponent from 'src/components/tablecomponent/TableComponent';
// eslint-disable-next-line import/no-unresolved
import CONSTANTS from 'src/constants';
// eslint-disable-next-line import/no-unresolved
import { masterCityDelete } from 'src/services/utils/admin/MasterServises';
// eslint-disable-next-line import/no-unresolved
import EditIcon from '@mui/icons-material/Edit';
// eslint-disable-next-line import/no-unresolved
import DeleteIcon from '@mui/icons-material/Delete';
// eslint-disable-next-line import/order
import DialogModal from '../masterPage/DialogModal';
// eslint-disable-next-line import/order, import/no-unresolved

// eslint-disable-next-line import/no-unresolved
import { settingsDelete, settingsGetAll } from 'src/services/utils/admin/SettingsServises';
// eslint-disable-next-line import/no-unresolved
import SettingsModal from 'src/components/forms/SettingsModal';

const SettingsPage = () => {
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
  useEffect(() => {
    getTableData();
  }, []);
  const getTableData = async () => {
    try {
      setLoading(true);
      const { data } = await settingsGetAll();
      console.log(data.data);
      if (data) {
        const arrayOfRows = data.data.map((item) => ({
          col1: item.matching_criteria_id ? item.matching_criteria_id : '---',
          col2: item?.matchingCriteriaType ? item?.matchingCriteriaType : '---',
          col3: item?.value ? item?.value : '---',
          col4: (
            <div>
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
                  setTableId(item.matching_criteria_id);
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
    const { message } = await settingsDelete(tableId);
    console.log(message);
    setDeleteModal(false);
    getTableData();
  };
  console.log(rows);
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
          {' '}
          <CircularProgress />
        </div>
      ) : (
        <TableComponent data={rows} columns={CONSTANTS.SETTINGS_HEADERS} />
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
        <SettingsModal
          setModalOpen={setModalOpen}
          getTableData={getTableData}
          defaultFormData={defaultFormData}
          modalValue={modalValue}
        />
      )}
    </div>
  );
};

export default SettingsPage;

import { Button, Container, TextField, Grid, Select, MenuItem, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import {
  masterStoreCreate,
  masterStoreUpdate,
  // eslint-disable-next-line import/no-unresolved
} from 'src/services/utils/admin/MasterServises';

const MasterStoreModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    businessId: 0,
    addressLine1: '',
    addressLine2: '',
    province: '',
    city: '',
    postcode: '',
    transactionDate: '',
    approvedBy: 0,
    approvalUserType: '',
    approvalStatus: '',
    userId: 0,
    userType: '',
    deleted: 0,
    raisedByStoreManager: '',
    raisedBy: 0,
  });

  const [errors, setErrors] = useState({
    // Initialize error messages for each field here
    businessId: 0,
    addressLine1: '',
    addressLine2: '',
    province: '',
    city: '',
    postcode: '',
    transactionDate: '',
    approvedBy: 0,
    approvalUserType: '',
    approvalStatus: '',
    userId: 0,
    userType: '',
    deleted: 0,
    raisedByStoreManager: '',
    raisedBy: 0,
    // ... (other fields)
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate the 'craNumber' field (for example, add your own validation logic)
    if (values.transactionDate.trim() === '') {
      newErrors.transactionDate = 'Transaction Date is required';
      isValid = false;
    }

    // Validate the 'legalBusinessName' field (for example, add your own validation logic)
    // if (values.legalBusinessName.trim() === '') {
    //   newErrors.legalBusinessName = 'Legal Business Name is required';
    //   isValid = false;
    // }
    // if (!values.transactionDate) {
    //   newErrors.transactionDate = 'Transaction Date is required';
    //   isValid = false;
    // } else {
    //   newErrors.transactionDate = '';
    // }

    // Add more validation logic for other fields as needed

    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === 'userId' || name === 'deleted' || name === 'approvedBy' || name === 'raisedBy' || name === 'businessId'
        ? parseInt(value, 10)
        : value;
    setValues({
      ...values,
      [name]: parsedValue,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const addDataFunction = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterStoreCreate(values);
        console.log(res);
        getTableData();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here, for example, show an error message to the user.
    } finally {
      setLoading(false);
    }
  };

  const updateDataFunction = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterStoreUpdate(values, values.businessId);
        console.log(res);
        getTableData();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here, for example, show an error message to the user.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    modalValue === 'edit' && setValues(defaultFormData);
  }, []);
  const storedArrayJSON = localStorage.getItem('businessid');
  const storedArray = JSON.parse(storedArrayJSON);
  console.log(storedArray);
  const formatDate = (dateString) => {
    // Define a regular expression pattern for the expected date format "DD-MM-YYYY"
    const dateFormatPattern = /^(\d{2})-(\d{2})-(\d{4})$/;

    if (dateFormatPattern.test(dateString)) {
      const parts = dateString.split('-'); // Split the date string by hyphens
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      // Create a new date string in the "YYYY-MM-DD" format
      return `${year}-${month}-${day}`;
    }

    // If the date format is not as expected, return the original dateString
    return dateString;
  };
  return (
    <div>
      <ModalComponent
        loading={loading}
        // modalTitle="Create Modal"
        modalTitle={modalValue === 'edit' ? 'Edit' : 'Create'}
        createBtnName={modalValue === 'edit' ? 'Update' : 'Create'}
        cancelBtnfun={() => {
          setModalOpen(false);
        }}
        createBtnFun={() => {
          if (modalValue === 'edit') {
            updateDataFunction();
          } else {
            addDataFunction();
          }
        }}
      >
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                label="Store ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="store_id"
                value={values.store_id}
                onChange={handleChange}
              /> */}
            </Grid>
            <Grid item xs={6} mt={2}>
              <Select
                label="Bussiness Id"
                fullWidth
                margin="normal"
                variant="outlined"
                name="provinceId"
                value={values.businessId ? values.businessId : 0}
                onChange={handleChange}
                // error={Boolean(errors.provinceId)}
                // helperText={errors.provinceId}
              >
                <MenuItem value={0}>Bussiness Id</MenuItem>
                {storedArray.map((option) => (
                  <MenuItem key={option.businessId} value={option.businessId}>
                    {option.businessId}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address Line 1"
                fullWidth
                margin="normal"
                variant="outlined"
                name="addressLine1"
                value={values.addressLine1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address Line 2"
                fullWidth
                margin="normal"
                variant="outlined"
                name="addressLine2"
                value={values.addressLine2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Province"
                fullWidth
                margin="normal"
                variant="outlined"
                name="province"
                value={values.province}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                margin="normal"
                variant="outlined"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Postcode"
                fullWidth
                margin="normal"
                variant="outlined"
                name="postcode"
                value={values.postcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="date"
                  type="date"
                  // value={values.transactionDate ? '2023-09-10' : ''}
                  value={modalValue === 'edit' ? formatDate(values.transactionDate) : values.transactionDate}
                  onChange={(e) => {
                    setValues({ ...values, transactionDate: e.target.value });
                  }}
                  // defaultValue="2017-05-24"
                  // disablePast={true}
                  sx={{ width: 250, fontSize: 16 }}
                  error={Boolean(errors.transactionDate)}
                  helperText={errors.transactionDate}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Approved By"
                fullWidth
                margin="normal"
                variant="outlined"
                name="approvedBy"
                value={values.approvedBy ? values.approvedBy : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Approval User Type"
                fullWidth
                margin="normal"
                variant="outlined"
                name="approvalUserType"
                value={values.approvalUserType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Approval Status"
                fullWidth
                margin="normal"
                variant="outlined"
                name="approvalStatus"
                value={values.approvalStatus}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="User ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="userId"
                value={values.userId ? values.userId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="User Type"
                fullWidth
                margin="normal"
                variant="outlined"
                name="userType"
                value={values.userType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Deleted"
                fullWidth
                margin="normal"
                variant="outlined"
                name="deleted"
                value={values.deleted ? values.deleted : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Raised By Store Manager"
                fullWidth
                margin="normal"
                variant="outlined"
                name="raisedByStoreManager"
                value={values.raisedByStoreManager}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Raised By"
                fullWidth
                margin="normal"
                variant="outlined"
                name="raisedBy"
                value={values.raisedBy ? values.raisedBy : 0}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Container>
      </ModalComponent>
    </div>
  );
};

export default MasterStoreModal;

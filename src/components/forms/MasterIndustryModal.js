import { Button, Container, TextField, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import { masterIndustryCreate, masterIndustryUpdate } from 'src/services/utils/admin/MasterServises';

const MasterIndustryModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    // industryId: '',
    industryName: '',
    transactionDate: '',
    userId: 0,
    userType: '',
    deleted: 0,
  });
  const [errors, setErrors] = useState({
    // Initialize error messages for each field here
    industryName: '',
    transactionDate: '',
    userId: '',
    userType: '',
    deleted: '',
    // ... (other fields)
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'userId' || name === 'deleted' ? parseInt(value, 10) : value;
    setValues({
      ...values,
      [name]: parsedValue,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate the 'craNumber' field (for example, add your own validation logic)
    if (values.industryName.trim() === '') {
      newErrors.industryName = 'Industry Name is required';
      isValid = false;
    }

    // Validate the 'legalBusinessName' field (for example, add your own validation logic)
    if (values.userType.trim() === '') {
      newErrors.userType = 'User Type is required';
      isValid = false;
    }
    if (!values.transactionDate) {
      newErrors.transactionDate = 'Transaction Date is required';
      isValid = false;
    } else {
      newErrors.transactionDate = '';
    }

    // Add more validation logic for other fields as needed

    setErrors(newErrors);
    return isValid;
  };
  const addDataFunction = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterIndustryCreate(values);
        console.log(res);
        setModalOpen(false);
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
        const res = await masterIndustryUpdate(values, values.industry_id);
        setModalOpen(false);
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
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    modalValue === 'edit' && setValues(defaultFormData);
  }, []);

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
                label="Industry ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="industryId"
                value={values.industryId}
                onChange={handleChange}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Industry Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="industryName"
                value={values.industryName}
                onChange={handleChange}
                error={Boolean(errors.industryName)}
                helperText={errors.industryName}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              {/* <TextField
                label="Transaction Date"
                fullWidth
                margin="normal"
                variant="outlined"
                name="transactionDate"
                value={values.transactionDate}
                onChange={handleChange}
              /> */}
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
                value={values.userType ? values.userType : ''}
                onChange={handleChange}
                error={Boolean(errors.userType)}
                helperText={errors.userType}
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
            {/* Add more TextField components in a similar way */}
          </Grid>
        </Container>
      </ModalComponent>
    </div>
  );
};

export default MasterIndustryModal;

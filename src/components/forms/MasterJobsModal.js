import { Button, Container, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import {
  masterJobCreate,
  masterJobUpdate,
  // eslint-disable-next-line import/no-unresolved
} from 'src/services/utils/admin/MasterServises';

const MasterJobsModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    employerId: 0,
    storeManagerId: 0,
    industryId: 0,
    jobTypeId: 0,
    storeId: 0,
    noPositionsAvailable: 0,
    noPositionsOccured: 0,
    minSalary: 0,
    maxSalary: 0,
    yearsOfExperience: 0,
    postStatus: 0,
    createdDate: '',
    modifiedDate: '',
    transactionDate: '',
    userId: 0,
    userType: '',
    isDeleted: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === 'userId' ||
      name === 'isDeleted' ||
      name === 'employerId' ||
      name === 'jobTypeId' ||
      name === 'storeManagerId' ||
      name === 'industryId' ||
      name === 'storeId' ||
      name === 'noPositionsAvailable' ||
      name === 'noPositionsOccured' ||
      name === 'minSalary' ||
      name === 'maxSalary' ||
      name === 'yearsOfExperience' ||
      name === 'postStatus'
        ? parseInt(value, 10)
        : value;
    setValues({
      ...values,
      [name]: parsedValue,
    });
  };

  const addDataFunction = async () => {
    setLoading(true);
    try {
      const res = await masterJobCreate(values);
      setModalOpen(false);
      console.log(res);
      getTableData();
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
      const res = await masterJobUpdate(values, values.job_post_id);
      console.log(res);
      setModalOpen(false);
      getTableData();
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

  return (
    <div>
      <ModalComponent
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
                label="Job Post ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="job_post_id"
                value={values.job_post_id}
                onChange={handleChange}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Employer ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="employerId"
                value={values.employerId ? values.employerId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Store Manager ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="storeManagerId"
                value={values.storeManagerId ? values.storeManagerId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Industry ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="industryId"
                value={values.industryId ? values.industryId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Job Type ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="jobTypeId"
                value={values.jobTypeId ? values.jobTypeId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Store ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="storeId"
                value={values.storeId ? values.storeId : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="No. Positions Available"
                fullWidth
                margin="normal"
                variant="outlined"
                name="noPositionsAvailable"
                value={values.noPositionsAvailable ? values.noPositionsAvailable : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="No. Positions Occured"
                fullWidth
                margin="normal"
                variant="outlined"
                name="noPositionsOccured"
                value={values.noPositionsOccured ? values.noPositionsOccured : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Minimum Salary"
                fullWidth
                margin="normal"
                variant="outlined"
                name="minSalary"
                value={values.minSalary ? values.minSalary : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Maximum Salary"
                fullWidth
                margin="normal"
                variant="outlined"
                name="maxSalary"
                value={values.maxSalary ? values.maxSalary : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Years of Experience"
                fullWidth
                margin="normal"
                variant="outlined"
                name="yearsOfExperience"
                value={values.yearsOfExperience ? values.yearsOfExperience : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Post Status"
                fullWidth
                margin="normal"
                variant="outlined"
                name="postStatus"
                value={values.postStatus ? values.postStatus : 0}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Created Date"
                fullWidth
                margin="normal"
                variant="outlined"
                name="createdDate"
                value={values.createdDate ? values.createdDate : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Modified Date"
                fullWidth
                margin="normal"
                variant="outlined"
                name="modifiedDate"
                value={values.modifiedDate ? values.modifiedDate : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Transaction Date"
                fullWidth
                margin="normal"
                variant="outlined"
                name="transactionDate"
                value={values.transactionDate}
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
                label="Is Deleted"
                fullWidth
                margin="normal"
                variant="outlined"
                name="isDeleted"
                value={values.isDeleted ? values.isDeleted : 0}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Container>
      </ModalComponent>
    </div>
  );
};

export default MasterJobsModal;

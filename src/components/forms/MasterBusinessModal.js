// import { Button, Container, Grid, TextField } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import ModalComponent from 'src/pages/masterPage/ModalComponent';
// // eslint-disable-next-line import/no-unresolved
// import { masterNotificationCreate, masterNotificationUpdate } from 'src/services/utils/admin/MasterServises';

// const MasterBussinessModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
//   const [values, setValues] = useState({
//     businessId: 0,
//     craNumber: '',
//     legalBusinessName: '',
//     opBusinessName: '',
//     addressLine1: '',
//     addressLine2: '',
//     province: '',
//     city: '',
//     postcode: '',
//     businessEmail: '',
//     authPersonName: '',
//     authPersonContact: '',
//     storeCount: 0,
//     brandImagePath: '',
//     actualFileName: '',
//     transactionDate: '',
//     userId: 0,
//     userType: '',
//     deleted: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const addDataFunction = async () => {
//     const res = await masterNotificationCreate(values);
//     console.log(res);
//     getTableData();
//   };
//   const updateDataFunction = async () => {
//     const res = await masterNotificationUpdate(values, values.notification_template_id);
//     console.log(res);
//     getTableData();
//   };
//   useEffect(() => {
//     // eslint-disable-next-line no-unused-expressions
//     modalValue === 'edit' && setValues(defaultFormData);
//   }, []);

//   return (
//     <div>
//       <ModalComponent
//         modalTitle="Create Modal"
//         cancelBtnfun={() => {
//           setModalOpen(false);
//         }}
//         createBtnFun={() => {
//           if (modalValue === 'edit') {
//             updateDataFunction();
//           } else {
//             addDataFunction();
//           }
//         }}
//       >
//         <Container maxWidth="sm">
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Notification Template ID"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="notification_template_id"
//                 value={values.notification_template_id}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Message"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="message"
//                 value={values.message}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Template Type"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="templateType"
//                 value={values.templateType}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Transaction Date"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="transactionDate"
//                 value={values.transactionDate}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="User ID"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="userId"
//                 value={values.userId}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="User Type"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="userType"
//                 value={values.userType}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Deleted"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="deleted"
//                 value={values.deleted}
//                 onChange={handleChange}
//               />
//             </Grid>
//             {/* Add more TextField components in a similar way */}
//           </Grid>
//         </Container>
//       </ModalComponent>
//     </div>
//   );
// };

// export default MasterBussinessModal;
import { Button, Container, TextField, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import {
  masterBussinessCreate,
  masterBussinessUpdate,
  masterNotificationCreate,
  masterNotificationUpdate,
  // eslint-disable-next-line import/no-unresolved
} from 'src/services/utils/admin/MasterServises';

const MasterBussinessModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    // businessId: 0,
    craNumber: '',
    legalBusinessName: '',
    opBusinessName: '',
    addressLine1: '',
    addressLine2: '',
    province: '',
    city: '',
    postcode: '',
    businessEmail: '',
    authPersonName: '',
    authPersonContact: '',
    storeCount: 0,
    brandImagePath: '',
    actualFileName: '',
    transactionDate: '',
    userId: 0,
    userType: '',
    deleted: 0,
  });

  const [errors, setErrors] = useState({
    // Initialize error messages for each field here
    craNumber: '',
    legalBusinessName: '',
    // ... (other fields)
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate the 'craNumber' field (for example, add your own validation logic)
    if (values.craNumber.trim() === '') {
      newErrors.craNumber = 'CRA Number is required';
      isValid = false;
    }

    // Validate the 'legalBusinessName' field (for example, add your own validation logic)
    if (values.legalBusinessName.trim() === '') {
      newErrors.legalBusinessName = 'Legal Business Name is required';
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const addDataFunction = async () => {
    // if (validateForm()) {
    //   const res = await masterBussinessCreate(values);
    //   console.log(res);
    //   setModalOpen(false);
    //   getTableData();
    // }
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterBussinessCreate(values);
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
        const res = await masterBussinessUpdate(values, values.businessId);
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

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    modalValue === 'edit' && setValues(defaultFormData);
  }, []);
  console.log(values);
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
        modalTitle={modalValue === 'edit' ? 'Edit' : 'Create'}
        cancelBtnfun={() => {
          setModalOpen(false);
        }}
        createBtnName={modalValue === 'edit' ? 'Update' : 'Create'}
        createBtnFun={() => {
          if (modalValue === 'edit') {
            updateDataFunction();
          } else {
            addDataFunction();
          }
        }}
        loading={loading}
      >
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                label="Business ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="businessId"
                value={values.businessId}
                onChange={handleChange}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CRA Number"
                fullWidth
                margin="normal"
                variant="outlined"
                name="craNumber"
                value={values.craNumber}
                onChange={handleChange}
                error={Boolean(errors.craNumber)}
                helperText={errors.craNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Business Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="legalBusinessName"
                value={values.legalBusinessName}
                onChange={handleChange}
                error={Boolean(errors.legalBusinessName)}
                helperText={errors.legalBusinessName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Operating Business Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="opBusinessName"
                value={values.opBusinessName}
                onChange={handleChange}
              />
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
            <Grid item xs={6}>
              <TextField
                label="Business Email"
                fullWidth
                margin="normal"
                variant="outlined"
                name="businessEmail"
                value={values.businessEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Authorized Person Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="authPersonName"
                value={values.authPersonName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Authorized Person Contact"
                fullWidth
                margin="normal"
                variant="outlined"
                name="authPersonContact"
                value={values.authPersonContact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Store Count"
                fullWidth
                margin="normal"
                variant="outlined"
                name="storeCount"
                value={values.storeCount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Brand Image Path"
                fullWidth
                margin="normal"
                variant="outlined"
                name="brandImagePath"
                value={values.brandImagePath}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Actual File Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="actualFileName"
                value={values.actualFileName}
                onChange={handleChange}
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
                value={values.userId}
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
                value={values.deleted}
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

export default MasterBussinessModal;

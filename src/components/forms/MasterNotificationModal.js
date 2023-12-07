// import { AccountCircle, Lock } from '@mui/icons-material';
// import { Button, Container, Paper, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import ModalComponent from 'src/pages/masterPage/ModalComponent';

// const MasterNotificationModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
//   const [values, setValues] = useState({
//     notification_template_id: 0,
//     message: 'string',
//     templateType: 'string',
//     transactionDate: 'string',
//     userId: 0,
//     userType: 'string',
//     deleted: 'string',
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <ModalComponent
//         modalTitle="Create Modal"
//         cancelBtnfun={() => {
//           setModalOpen(false);
//         }}
//         createBtnFun={() => {
//           console.log('gdhsghsdghs');
//         }}
//       >
//         <Container maxWidth="sm">
//           {/* <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}> */}

//           <TextField
//             label="Username"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             type="text"
//             onChange={() => {
//               handleChange();
//             }}
//           />

//           {/* </Paper> */}
//         </Container>
//       </ModalComponent>
//     </div>
//   );
// };

// export default MasterNotificationModal;
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import { masterNotificationCreate, masterNotificationUpdate } from 'src/services/utils/admin/MasterServises';

const MasterNotificationModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    // notification_template_id: 0,
    message: '',
    templateType: '',
    transactionDate: '',
    userId: 0,
    userType: '',
    deleted: 0,
  });
  const [errors, setErrors] = useState({
    message: '',
    templateType: '',
    transactionDate: '',
    userId: 0,
    userType: '',
    deleted: 0,
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
    if (values.message.trim() === '') {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    // Validate the 'legalBusinessName' field (for example, add your own validation logic)
    if (values.templateType.trim() === '') {
      newErrors.templateType = 'Templet type  is required';
      isValid = false;
    }
    if (!values.transactionDate) {
      newErrors.transactionDate = 'Transaction Date is required';
      isValid = false;
    } else {
      newErrors.transactionDate = '';
    }
    if (values.userId === 0) {
      newErrors.userId = 'User ID is required';
      isValid = false;
    } else {
      newErrors.userId = '';
    }

    // Add more validation logic for other fields as needed

    setErrors(newErrors);
    return isValid;
  };
  const addDataFunction = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterNotificationCreate(values);
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
        const res = await masterNotificationUpdate(values, values.notification_template_id);
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
        // modalTitle="Create Model"
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
          {/* <TextField
            label="Notification Template ID"
            fullWidth
            margin="normal"
            variant="outlined"
            name="notification_template_id"
            value={values.notification_template_id ? values.notification_template_id : ''}
            onChange={handleChange}
          /> */}
          <TextField
            label="Message"
            fullWidth
            margin="normal"
            variant="outlined"
            name="message"
            value={values.message ? values.message : ''}
            onChange={handleChange}
            error={Boolean(errors.message)}
            helperText={errors.message}
          />
          <TextField
            label="Template Type"
            fullWidth
            margin="normal"
            variant="outlined"
            name="templateType"
            value={values.templateType ? values.templateType : ''}
            onChange={handleChange}
            error={Boolean(errors.templateType)}
            helperText={errors.templateType}
          />
          {/* <TextField
            label="Transaction Date"
            fullWidth
            margin="normal"
            variant="outlined"
            name="transactionDate"
            value={values.transactionDate ? values.transactionDate : ''}
            onChange={handleChange}
          /> */}
          <Box mt={2}>
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
          </Box>
          <TextField
            label="User ID"
            fullWidth
            margin="normal"
            variant="outlined"
            name="userId"
            value={values.userId ? values.userId : 0}
            onChange={handleChange}
          />
          <TextField
            label="User Type"
            fullWidth
            margin="normal"
            variant="outlined"
            name="userType"
            value={values.userType ? values.userType : ''}
            onChange={handleChange}
          />
          <TextField
            label="Deleted"
            fullWidth
            margin="normal"
            variant="outlined"
            name="deleted"
            value={values.deleted ? values.deleted : 0}
            onChange={handleChange}
          />
        </Container>
      </ModalComponent>
    </div>
  );
};

export default MasterNotificationModal;

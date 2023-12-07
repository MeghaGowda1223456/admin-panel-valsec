import { Button, Container, TextField, Grid, Select, MenuItem, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import {
  masterCityCreate,
  masterCityUpdate,
  masterProvinceFetch,

  // eslint-disable-next-line import/no-unresolved
} from 'src/services/utils/admin/MasterServises';

const MasterCityModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    // cityId: 0,
    cityName: '',
    provinceId: 0,
    transactionDate: '',
    userId: 0,
    userType: '',
    deleted: true,
    // Add more fields here
    // For example:
    // field1: '',
    // field2: '',
    // field3: '',
    // ...
  });
  const [errors, setErrors] = useState({
    cityName: '',
    provinceId: '',
    transactionDate: '',
    userId: '',
    userType: '',
    deleted: '',
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!values.cityName) {
      newErrors.cityName = 'City Name is required';
      isValid = false;
    } else {
      newErrors.cityName = '';
    }

    if (values.provinceId === 0) {
      newErrors.provinceId = 'Please select a Province';
      isValid = false;
    } else {
      newErrors.provinceId = '';
    }

    // Add validation for other fields
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

    if (!values.userType) {
      newErrors.userType = 'User Type is required';
      isValid = false;
    } else {
      newErrors.userType = '';
    }

    if (values.deleted === '') {
      newErrors.deleted = 'Deleted is required';
      isValid = false;
    } else {
      newErrors.deleted = '';
    }

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
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await masterCityCreate(values);
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
        const res = await masterCityUpdate(values, values.cityId);
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
  const optionDataFun = async () => {
    const { data } = await masterProvinceFetch();
    console.log(data);
    const op = data.map((v) => {
      return {
        label: v.provinceName,
        value: v.province_id,
      };
    });
    setOptions(op);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    modalValue === 'edit' && setValues(defaultFormData);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    optionDataFun();
  }, []);
  console.log(values);
  return (
    <div>
      <ModalComponent
        // modalTitle="Create Modal"
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
                label="City ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="cityId"
                value={values.cityId}
                onChange={handleChange}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="cityName"
                value={values.cityName}
                onChange={handleChange}
                error={Boolean(errors.cityName)}
                helperText={errors.cityName}
              />
            </Grid>
            <Grid item xs={6} mt={2}>
              {/* <TextField
                label="Province ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="provinceId"
                value={values.provinceId}
                onChange={handleChange}
              /> */}
              <Select
                label="Province"
                fullWidth
                margin="normal"
                variant="outlined"
                name="provinceId"
                value={values.provinceId}
                onChange={handleChange}
                error={Boolean(errors.provinceId)}
                helperText={errors.provinceId}
              >
                <MenuItem value={0}>Select Province</MenuItem>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
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
              {/* <ReactDatePicker
                placeholderText="Transaction Date"
                selected={values.transactionDate}
                onChange={handleToDateChange}
                dateFormat="dd-MM-yyyy"
                style={{ padding: '20px' }}
              /> */}
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="date"
                  type="date"
                  value={values.transactionDate ? values.transactionDate : ''}
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

export default MasterCityModal;
// import { Button, Container, TextField, Grid, Select, MenuItem } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import ModalComponent from 'src/pages/masterPage/ModalComponent';
// // eslint-disable-next-line import/no-unresolved
// import { masterCityCreate, masterCityUpdate, masterProvinceFetch } from 'src/services/utils/admin/MasterServises';

// const MasterCityModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
//   const [options, setOptions] = useState([]);
//   const [values, setValues] = useState({
//     cityName: '',
//     provinceId: '',
//     transactionDate: '',
//     userId: 0,
//     userType: '',
//     deleted: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const addDataFunction = async () => {
//     const res = await masterCityCreate(values);
//     console.log(res);
//     getTableData();
//   };

//   const updateDataFunction = async () => {
//     const res = await masterCityUpdate(values, values.cityId);
//     console.log(res);
//     getTableData();
//   };

//   const optionDataFun = async () => {
//     const { data } = await masterProvinceFetch();
//     const op = data.map((v) => {
//       return {
//         label: v.provinceName,
//         value: v._id,
//       };
//     });
//     setOptions(op);
//   };
//   const handleProvinceChange = (e) => {
//     console.log(e);
//     const selectedProvinceId = e.target.value;
//     setValues({
//       ...values,
//       provinceId: selectedProvinceId,
//     });
//   };
//   useEffect(() => {
//     if (modalValue === 'edit') {
//       setValues(defaultFormData);
//     }
//     optionDataFun();
//   }, []);

//   return (
//     <div>
//       <ModalComponent
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
//                 label="City Name"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="cityName"
//                 value={values.cityName}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Select
//                 label="Province"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="provinceId"
//                 value={values.provinceId}
//                 onChange={handleProvinceChange}
//               >
//                 {/* <MenuItem value={0}>Select Province</MenuItem> */}
//                 {options.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
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
//           </Grid>
//         </Container>
//       </ModalComponent>
//     </div>
//   );
// };

// export default MasterCityModal;

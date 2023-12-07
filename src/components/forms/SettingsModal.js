// import { Button, Container, TextField, Grid } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import ModalComponent from 'src/pages/masterPage/ModalComponent';
// // eslint-disable-next-line import/no-unresolved
// import {
//   masterCityCreate,
//   masterCityUpdate,
//   // eslint-disable-next-line import/no-unresolved
// } from 'src/services/utils/admin/MasterServises';
// // eslint-disable-next-line import/no-unresolved
// import { settingsCreate, settingsUpdate } from 'src/services/utils/admin/SettingsServises';

// const SettingsModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
//   const [loading, setLoading] = useState(false);

//   const [values, setValues] = useState({
//     matchingCriteriaId: '',
//     matchingCriteriaType: '',
//     value: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const addDataFunction = async () => {
//     setLoading(true);
//     try {
//       const res = await settingsCreate(values);
//       if (res.data.error === null) {
//         getTableData();
//         setModalOpen(false);
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       // Handle the error here, for example, show an error message to the user.
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateDataFunction = async () => {
//     setLoading(true);
//     try {
//       const res = await settingsUpdate(values);
//       console.log(res);
//       if (res.data.error === null) {
//         getTableData();
//         setModalOpen(false);
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       // Handle the error here, for example, show an error message to the user.
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line no-unused-expressions
//     modalValue === 'edit' &&
//       setValues({
//         matchingCriteriaId: defaultFormData.matching_criteria_id,
//         matchingCriteriaType: defaultFormData.matchingCriteriaType,
//         value: defaultFormData.value,
//       });
//   }, []);

//   return (
//     <div>
//       <ModalComponent
//         loading={loading}
//         // modalTitle="Create Modal"
//         modalTitle={modalValue === 'edit' ? 'Edit' : 'Create'}
//         createBtnName={modalValue === 'edit' ? 'Update' : 'Create'}
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
//                 label="Matching Criteria ID"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="matchingCriteriaId"
//                 value={values.matchingCriteriaId ? values.matchingCriteriaId : ''}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Matching Criteria Type"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="matchingCriteriaType"
//                 value={values.matchingCriteriaType ? values.matchingCriteriaType : ''}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Value"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 name="value"
//                 value={values.value ? values.value : ''}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </ModalComponent>
//     </div>
//   );
// };

// export default SettingsModal;
import { Button, Container, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import ModalComponent from 'src/pages/masterPage/ModalComponent';
// eslint-disable-next-line import/no-unresolved
import { settingsCreate, settingsUpdate } from 'src/services/utils/admin/SettingsServises';

const SettingsModal = ({ setModalOpen, getTableData, modalValue, defaultFormData }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    matchingCriteriaType: '',
    value: 0,
  });

  const [errors, setErrors] = useState({
    matchingCriteriaType: '',
    value: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'value' ? parseInt(value, 10) : value;
    setValues({
      ...values,
      [name]: parsedValue,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (values.matchingCriteriaType.trim() === '') {
      newErrors.matchingCriteriaType = 'Matching Criteria Type is required';
      isValid = false;
    }

    if (values.value === 0) {
      newErrors.value = 'Value is required';
      isValid = false;
      // eslint-disable-next-line no-restricted-globals
    } else if (isNaN(values.value)) {
      newErrors.value = 'Value must be a number';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const addDataFunction = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const res = await settingsCreate(values);
        if (res.data.error === null) {
          getTableData();
          setModalOpen(false);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateDataFunction = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const res = await settingsUpdate(values);
        if (res.data.error === null) {
          getTableData();
          setModalOpen(false);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (modalValue === 'edit') {
      setValues({
        matchingCriteriaId: defaultFormData.matching_criteria_id,
        matchingCriteriaType: defaultFormData.matchingCriteriaType,
        value: defaultFormData.value,
      });
    }
  }, [modalValue, defaultFormData]);

  return (
    <div>
      <ModalComponent
        loading={loading}
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
                label="Matching Criteria ID"
                fullWidth
                margin="normal"
                variant="outlined"
                name="matchingCriteriaId"
                value={values.matchingCriteriaId}
                onChange={handleChange}
                error={errors.matchingCriteriaId !== ''}
                helperText={errors.matchingCriteriaId}
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Matching Criteria Type"
                fullWidth
                margin="normal"
                variant="outlined"
                name="matchingCriteriaType"
                value={values.matchingCriteriaType ? values.matchingCriteriaType : ''}
                onChange={handleChange}
                error={errors.matchingCriteriaType !== ''}
                helperText={errors.matchingCriteriaType}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Value"
                fullWidth
                margin="normal"
                variant="outlined"
                name="value"
                value={values.value ? values.value : 0}
                onChange={handleChange}
                error={errors.value !== ''}
                helperText={errors.value}
              />
            </Grid>
          </Grid>
        </Container>
      </ModalComponent>
    </div>
  );
};

export default SettingsModal;

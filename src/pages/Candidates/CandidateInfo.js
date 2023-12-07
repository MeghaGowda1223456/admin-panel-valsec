// import React, { useEffect, useRef, useState } from 'react';
// import { IconButton } from '@mui/material';

// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// // eslint-disable-next-line import/no-unresolved
// import { candidateGetData } from 'src/services/utils/admin/CandidateServises';
// import CandidateExperienceTbl from '../interviews/CandidateExperienceTbl';
// import { downloadFileFromString } from '../../utils/downloadFile';
// import Iconify from '../../components/iconify';
// import { fDate } from '../../utils/formatTime';

// export default function CandidateInfo(data) {
//   const [candidate,setCandidate]=useState([])
//   const [loading,setLoading]=useState(false)
//   const getTableData = async () => {
//     try {
//       const { data } = await candidateGetData();
//       console.log(data);
//       setCandidate(data);
//       // if (data) {
//       //   const arrayOfRows = data.map((item) => ({
//       //     col1: item?.employer_id,
//       //     col2: item?.emplioyerName,
//       //     col3: item?.email,
//       //     col4: item?.employerContact,
//       //     col5: item.isDeleted===0?"No":"Yes",
//       //     col6: item.active===0?"No":"Yes",
//       //   }));

//       //   setCandidate(arrayOfRows);
//       // }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false); // Set loading to false when data fetching is done
//     }
//   };

//   useEffect(() => {
//     getTableData();
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm container>
//         {candidate.map((candidate)=>{
//           return <Grid item xs container direction="column" spacing={2}>
//           <Grid item xs>
//             <Typography component="div" variant="h3">
//               {candidate.candidateName}
//             </Typography>
//             <Grid container spacing={2} columns={16}>
//               <Grid item xs={8} direction="column">
//                 <Grid item xs>
//                   <Typography variant="subtitle1" component="div">
//                     Conatct info:
//                   </Typography>
//                 </Grid>
//                 <Grid item xs>
//                   <Typography variant="body2" color="text.secondary">
//                     {candidate.contactNumber}
//                   </Typography>
//                   <Typography variant="body2" gutterBottom color="text.secondary">
//                     {candidate.email}
//                   </Typography>
//                 </Grid>
//               </Grid>

//               <Grid item xs={6} direction="column">
//                 <Grid item xs>
//                   <Typography variant="subtitle1" component="div">
//                     Address info:
//                   </Typography>
//                 </Grid>
//                 <Grid item xs>
//                   <Typography variant="body2" gutterBottom color="text.secondary">
//                     {candidate.city},{candidate.province}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Grid item xs>
//               <Typography variant="subtitle1" component="div">
//                 Other info:
//               </Typography>
//             </Grid>
//             <Grid container spacing={2} columns={12}>
//               <Grid item xs={6} direction="column">
//                 <Grid item xs>
//                   <Typography variant="body2" color="text.secondary">
//                     Gender: {candidate.gender}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {/* DOB : {fDate(candidate.dob)} */}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Qualification: {candidate.qualification}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Preferred Cities:
//                     {candidate.preferredCities &&
//                       candidate.preferredCities.map((row) => {
//                         return ' '.concat(row.cityName);
//                       })}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Immigration Status: {candidate.immigrationStatus}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Permitted to work: {candidate.permittedToWork === true ? 'YES' : 'NO'}
//                   </Typography>
//                 </Grid>
//               </Grid>

//               <Grid item xs={4} direction="column">
//                 <Grid item xs>
//                   <Typography variant="body2" color="text.secondary">
//                     WhatsApp Verified: {candidate.whatsappVerified === true ? 'YES' : 'NO'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Subscribed: {candidate.permittedToWork === true ? 'YES' : 'NO'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Industries:
//                     {candidate.industries &&
//                       candidate.industries.map((row) => {
//                         return ' '.concat(row.industryName);
//                       })}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Any Offer: {candidate.offerAccepted === true ? 'YES' : 'NO'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Can Drive: {candidate.canDrive === true ? 'YES' : 'NO'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Have Car: {candidate.haveCar === true ? 'YES' : 'NO'}
//                   </Typography>

//                   <Typography variant="body2" color="text.secondary">
//                     Resume:
//                     <IconButton
//                       size="large"
//                       color="inherit"
//                       onClick={() => downloadFileFromString(candidate.resumePath, candidate.actualFileName)}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         {candidate.actualFileName}
//                       </Typography>
//                       <Iconify icon={'ic:baseline-download-for-offline'} />
//                     </IconButton>
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <CandidateExperienceTbl candidate={candidate} />
//           </Grid>

//         </Grid>
//         })}

//       </Grid>
//     </Grid>
//   );
// }
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import TableComponent from 'src/components/tablecomponent/TableComponent';
// eslint-disable-next-line import/no-unresolved
import CONSTANTS from 'src/constants';
// eslint-disable-next-line import/no-unresolved
import { candidateGetData } from 'src/services/utils/admin/CandidateServises';

const CandidateInfo = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const getTableData = async () => {
    try {
      const { data } = await candidateGetData();
      console.log(data);
      if (data) {
        const arrayOfRows = data.map((item) => ({
          col1: item?.candidate_id ? item?.candidate_id : '---',
          col2: item?.candidateName ? item?.candidateName : '---',
          col3: item?.contact ? item?.contact : '---',
          col4: item?.email ? item?.email : '---',
          col5: item?.qualification ? item?.qualification : '---',

          // col7: item.deleted === '0' ? 'No' : 'Yes',
          // col8: item.isActive === '0' ? 'No' : 'Yes',
          col6: item?.yoe ? item?.yoe : '---',
        }));

        setRows(arrayOfRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
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
          <CircularProgress />{' '}
        </div>
      ) : (
        <TableComponent data={rows} columns={CONSTANTS.CANDIDATES_HEADERS} />
      )}
    </div>
  );
};

export default CandidateInfo;

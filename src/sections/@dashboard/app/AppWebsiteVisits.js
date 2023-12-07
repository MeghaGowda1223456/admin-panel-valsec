// import PropTypes from 'prop-types';
// import ReactApexChart from 'react-apexcharts';
// // @mui
// import { Card, CardHeader, Box, TextField, Grid, Container, Button } from '@mui/material';
// // components
// // eslint-disable-next-line import/no-unresolved
// import TableComponent from 'src/components/tablecomponent/TableComponent';
// import { useState } from 'react';
// import ReactDatePicker from 'react-datepicker';
// // eslint-disable-next-line import/no-unresolved
// import CONSTANTS from 'src/constants';
// import { useChart } from '../../../components/chart';
// // eslint-disable-next-line import/order, import/no-unresolved
// import 'react-datepicker/dist/react-datepicker.css';

// // ----------------------------------------------------------------------

// AppWebsiteVisits.propTypes = {
//   title: PropTypes.string,
//   subheader: PropTypes.string,
//   chartData: PropTypes.array.isRequired,
//   chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default function AppWebsiteVisits({ title, ...other }) {
//   const [selectedFromDate, setSelectedFromDate] = useState(new Date()); // Step 2
//   const handleFromDateChange = (date) => {
//     setSelectedFromDate(date); // Step 3
//   };
//   const rows = [
//     {
//       col1: ' item?.candidate_id',
//       col2: 'item?.candidateName',
//       col3: 'item?.contact',
//       col4: 'item?.email',
//       col5: ' item?.qualification',
//       col6: ' item.isDeleted',
//       col7: ' item.isActive',
//       col8: 'item?.yoe',
//     },
//   ];
//   return (
//     <Card {...other}>
//       <CardHeader title={title} />

//       <Grid container spacing={2} style={{ margin: '2%' }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <span>From Date</span>
//           <ReactDatePicker selected={selectedFromDate} onChange={handleFromDateChange} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <span>To Date</span>
//           <ReactDatePicker />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3} top={12}>
//           <Button>Submit</Button>
//         </Grid>
//       </Grid>

//       <div style={{ margin: '2%' }}>
//         {' '}
//         <TableComponent columns={CONSTANTS.INTERVIEWLIST_HEADERS} data={rows} />
//       </div>
//     </Card>
//   );
// }
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Grid, Button, CircularProgress, TextField, Stack } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import TableComponent from 'src/components/tablecomponent/TableComponent';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-unresolved
import CONSTANTS from 'src/constants';
import 'react-datepicker/dist/react-datepicker.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// eslint-disable-next-line import/no-unresolved

import { Link } from 'react-router-dom/dist';
// eslint-disable-next-line import/no-unresolved
import { dashboardGetData, googleMeetScheduleService } from 'src/services/utils/admin/DashBoardServises';
import GooglemeetScheduleModal from './DashboardGooglemeetSchedule';

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// eslint-disable-next-line react/prop-types
export default function AppWebsiteVisits({ title, ...other }) {
  const [fromDate, setFromDate] = useState('2023-09-10');
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
  const day = String(todaysDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [toDate, setToDate] = useState(formattedDate);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [gMeetScheduleModal, setGMeetScheduleModal] = useState(false);
  const [tableId, setTableId] = useState({ interviewId: '' });

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Successfully copied to clipboard');
        // Successfully copied to clipboard
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard: ', error);
      });
  };
  const getTableData = async () => {
    if (!fromDate) {
      alert('Please select both From Date and To Date');
      return;
    }
    setLoading(true);
    try {
      const { data } = await dashboardGetData({
        // eslint-disable-next-line object-shorthand
        fromDate: fromDate,
        // eslint-disable-next-line object-shorthand
        toDate: toDate,
      });

      console.log(data.data);

      if (data) {
        const arrayOfRows = data.data.interviewList.map((item) => ({
          col1: item?.match_id ? item?.match_id : '---',
          col2: item?.candidateName ? item?.candidateName : '---',
          col3: item?.employerName ? item?.employerName : '---',
          col4: item?.candidateStatus ? item?.candidateStatus : '---',

          col5: item?.interviewStartDate ? item?.interviewStartDate : '---',
          col6: item.transactionDate ? item.transactionDate : '---',

          col7: (
            <Button
              onClick={() => {
                if (!item.meetInvite) {
                  setGMeetScheduleModal(true);
                  setTableId({ interviewId: item.match_id });
                }
              }}
            >
              {item.meetInvite ? (
                <Button
                  onClick={() => {
                    copyToClipboard(item.meetInvite);
                  }}
                >
                  <Link style={{ color: 'blue' }}> Copy Interview Invite</Link>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'blue', color: 'white' }}>Schedule Interview</Button>
              )}
            </Button>
          ),
        }));

        setRows(arrayOfRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      // setLoading(false); // Set loading to false when data fetching is done
    }
  };
  useEffect(() => {
    getTableData();
  }, []);
  console.log(rows);

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Grid container spacing={2} style={{ margin: '2%' }}>
        <Grid item xs={12} sm={6} md={3}>
          {/* <ReactDatePicker
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd-MM-yyyy"
            style={{ padding: '50px' }}
          /> */}
          <Stack component="form" noValidate spacing={3}>
            <TextField
              id="date"
              type="date"
              value={fromDate}
              onChange={(e) => {
                console.log(e);
                setFromDate(e.target.value);
                setToDate('');
              }}
              // defaultValue="2017-05-24"
              // disablePast={true}
              sx={{ width: 250, fontSize: 16 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack component="form" noValidate spacing={3}>
            <TextField
              id="date"
              type="date"
              value={toDate}
              onChange={(e) => {
                console.log(e);
                if (fromDate && e.target.value < fromDate) {
                  alert('To Date cannot be less than From Date');
                } else {
                  setToDate(e.target.value);
                }
              }}
              // defaultValue="2017-05-24"
              // disablePast={true}
              sx={{ width: 250, fontSize: 16 }}
            />
          </Stack>
          {/* <span style={{ paddingRight: '4%' }}>To Date:</span>
          <ReactDatePicker selected={toDate} onChange={handleToDateChange} minDate={fromDate} dateFormat="dd-MM-yyyy" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={3} top={12} mt={1}>
          <Button
            onClick={() => {
              getTableData();
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* <div style={{ margin: '2%' }}>
        <TableComponent columns={CONSTANTS.INTERVIEWLIST_HEADERS} data={rows} />
      </div> */}
      <div style={{ margin: '2%', position: 'relative' }}>
        {loading ? ( // Step 4: Conditionally render loading indicator
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress />
          </div> // You can style this loading indicator as needed
        ) : (
          <TableComponent columns={CONSTANTS.INTERVIEWLIST_HEADERS} data={rows} />
        )}
      </div>
      {gMeetScheduleModal && (
        <GooglemeetScheduleModal
          deleteModal={gMeetScheduleModal}
          handleClose={() => {
            setGMeetScheduleModal(false);
          }}
          tableId={tableId}
          // handleDeleteClick={() => {
          //   googleMeetSchedule();
          // }}
          getTableData={getTableData}
          setGMeetScheduleModal={setGMeetScheduleModal}
        />
      )}
    </Card>
  );
}

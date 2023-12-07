import serviceUtil from '..';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
const dashboardGetData = (payload) => {
  return serviceUtil
    .post('/tempx/api/getDashboardDetails', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const dashboardCountData = () => {
  return serviceUtil
    .get('/tempx/api/getCounts')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
// const googleMeetScheduleService = (payload) => {
//   return serviceUtil
//     .post('/tempx/api/scheduleGoogleMeet', payload)
//     .then((res) => {
//       const data = res && res.data;
//       return { data };
//     })
//     .catch((err) => {
//       const errRes = err && err.response.data;
//       return { errRes };
//     });
// };
const googleMeetScheduleService = (payload) => {
  return serviceUtil
    .post('/tempx/api/scheduleGoogleMeet', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

export { dashboardGetData, dashboardCountData, googleMeetScheduleService };

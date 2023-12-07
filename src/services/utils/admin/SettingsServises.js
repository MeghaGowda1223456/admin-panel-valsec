import serviceUtil from '..';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

const settingsGetAll = () => {
  return serviceUtil
    .get('/tempx/api/settings/getAllMatchingCriteria')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const settingsDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/settings/deleteMatchingCriteriaById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};

const settingsCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/settings/saveMatchingCriteria', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const settingsUpdate = (payload, id) => {
  return serviceUtil
    .post(`/tempx/api/settings/updateMatchingCriteria`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

// bussiness

export { settingsGetAll, settingsDelete, settingsCreate, settingsUpdate };

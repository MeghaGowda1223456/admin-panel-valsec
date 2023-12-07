import serviceUtil from '..';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

const masterBusinessGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getAllBusinesses')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterCityGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getAllCities')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterIndustryGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getAllIndustries')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterJobGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getAllJobPosts')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterNotificationsGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getNotifications')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterStoreGetAll = () => {
  return serviceUtil
    .get('/tempx/api/getStores')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterBusinessDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteBusinessById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const masterCityDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteCityById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const masterIndustryDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteIndustryById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const masterNotificationDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteNotificationById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const masterJobDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteJobById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const masterStoreDelete = (businessId) => {
  return serviceUtil
    .deleteById(`/tempx/api/deleteStoreById/${businessId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};

const masterNotificationCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveNotificationTemplate', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterNotificationUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateNotificationById/${id}`, payload)
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

const masterBussinessCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveBusiness', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterBussinessUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateBusinessById/${id}`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

//   city

const masterCityCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveCity', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterCityUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateCityById/${id}`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

// job

const masterJobCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveJobPost', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterJobUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateJobById/${id}`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

// industry

const masterIndustryCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveIndustry', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterIndustryUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateIndustryById/${id}`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

// store
const masterStoreCreate = (payload) => {
  return serviceUtil
    .post('/tempx/api/saveStore', payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};
const masterStoreUpdate = (payload, id) => {
  return serviceUtil
    .put(`/tempx/api/updateStoreById/${id}`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const masterProvinceFetch = () => {
  return serviceUtil
    .get('tempx/api/fetchProvinceList')
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

export {
  masterBusinessGetAll,
  masterBusinessDelete,
  masterCityGetAll,
  masterStoreGetAll,
  masterNotificationsGetAll,
  masterJobGetAll,
  masterIndustryGetAll,
  masterCityDelete,
  masterStoreDelete,
  masterJobDelete,
  masterIndustryDelete,
  masterNotificationDelete,
  masterNotificationCreate,
  masterNotificationUpdate,
  masterBussinessCreate,
  masterBussinessUpdate,
  masterCityCreate,
  masterCityUpdate,
  masterJobCreate,
  masterJobUpdate,
  masterIndustryCreate,
  masterIndustryUpdate,
  masterStoreCreate,
  masterStoreUpdate,
  masterProvinceFetch,
};

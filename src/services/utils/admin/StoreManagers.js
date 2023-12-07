import serviceUtil from "..";


const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const storeManagerGetData = () => {
  return serviceUtil
    .get("/tempx/api/fetchStoreManagers")
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
    storeManagerGetData,

};

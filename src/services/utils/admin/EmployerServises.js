import serviceUtil from "..";



const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const employerGetData = () => {
  return serviceUtil
    .get("/tempx/api/fetchEmployers")
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
    employerGetData,

};

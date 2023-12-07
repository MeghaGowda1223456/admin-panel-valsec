import serviceUtil from "..";


const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const candidateGetData = () => {
  return serviceUtil
    .get("/tempx/api/fetchCandidates")
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
    candidateGetData,

};

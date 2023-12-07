// import serviceUtil from "./../index";
// const config = {
//   headers: {
//     // "content-type": "multipart/form-data",
//     "content-type": "application/json",
//   },
// };


// const LoginCall = (payload) => {
//   return serviceUtil
//     .post("/api/auth/adminLogin/", payload, config)
//     .then((res) => {
//       const data = res && res.data;
//       return { data };
//     })
//     .catch((err) => {
//       const errRes = err && err.response.data;
//       return { errRes };
//     });
// };
// export { LoginCall};
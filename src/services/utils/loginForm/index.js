import serviceUtil from "..";

const config = {
  headers: {
    // "content-type": "multipart/form-data",
    "content-type": "application/json",
  },
};

const LoginCall = (payload) => {
  return serviceUtil
    .post("/login", payload, config)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const forgotPassword = (payload) => {
  return serviceUtil
    .post("/employeeLoginCredential/forgetPassword", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const resetAdminPassword = (payload, token) => {
  return serviceUtil
    .post(`/employeeLoginCredential/resetPassword`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { LoginCall, forgotPassword, resetAdminPassword };

import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from '../api/axios';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const refreshURL = '/refreshToken';

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  // useEffect(() => {
  //   const refreshToken = cookies.get('refreshToken');
  //   const userprofile = JSON.parse(localStorage.getItem('userprofile'));
  //   if (refreshToken && userprofile) {
  //     const userType = userprofile?.userType;

  //     axios
  //       .post(
  //         refreshURL,
  //         null,
  //         { params: { refreshToken, userType } },
  //         {
  //           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //           withCredentials: true,
  //         }
  //       )
  //       .then((response) => {
  //         const accessToken = response?.data?.accessToken;
  //         const refreshToken = response?.data?.refreshToken;
  //         const user = response?.data?.user;
  //         cookies.set('refreshToken', refreshToken, { path: '/' });

  //         localStorage.setItem('userprofile', JSON.stringify(user));
  //         setAuth({ accessToken });
  //         setLoading(true);
  //       })
  //       .catch((err) => {
  //         console.log('in catch');
  //         setLoading(true);
  //         cookies.remove('refreshToken', { path: '/' });
  //         localStorage.removeItem('userprofile');
  //         setAuth({});
  //       });
  //   } else {
  //     setLoading(true);
  //     cookies.remove('refreshToken', { path: '/' });
  //     localStorage.removeItem('userprofile');
  //     setAuth({});
  //   }
  // }, [setAuth]);

  console.log('in ptovider', auth);
  if (loading) {
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
  }
  return <div>Loading...</div>;
};
export default AuthContext;

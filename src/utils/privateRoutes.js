import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PrivateRoutes = () => {
  // const { auth } = useAuth();
  // console.log(auth);
  const auth = localStorage.getItem('token');

  return auth ? <Outlet /> : <Navigate to={'login'} />;
};

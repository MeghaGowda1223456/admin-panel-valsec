import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Cookies from 'universal-cookie';

// eslint-disable-next-line import/no-unresolved
import { LoginCall } from 'src/services/utils/loginForm';
import Iconify from '../../../components/iconify';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

const loginURL = 'https://app.tempx.ca/login';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const cookies = new Cookies();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    // const res= await LoginCall( { username: email, password, userType: 'admin' })
    setLoading(true);
    axios
      .post(
        loginURL,
        null,
        { params: { username: email, password, userType: 'admin' } },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log('in success');
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        const user = response?.data?.user;
        cookies.set('refreshToken', refreshToken, { path: '/' });

        setAuth({ accessToken });
        localStorage.setItem('userprofile', JSON.stringify(user));
        localStorage.setItem('token', accessToken);
        setEmail('');
        setPassword('');
        setErrMsg('');
        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setErrMsg('Incorrect Username/Password');
      })
      .finally(() => {
        setLoading(false); // Hide the loader when the request completes
      });

    console.log('Click on submit');
  };

  useEffect(() => {
    emailRef.current.focus();
    setErrMsg('test');
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <Stack spacing={3}>
          {errMsg ? (
            <Alert severity="error" ref={errRef}>
              {errMsg}
            </Alert>
          ) : null}
          <TextField
            name="email"
            label="Email address"
            type="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox name="remember" label="Remember me" value="Keep me sign in" />}
            label="Keep me sign in"
          /> */}
          {/* 
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Login
        </LoadingButton>
      </form>
    </>
  );
}

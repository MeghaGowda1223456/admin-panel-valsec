import axios from 'axios';

export default axios.create({
  baseURL: 'https://testapp.tempx.ca:8443',
  withCredentials: true,
});

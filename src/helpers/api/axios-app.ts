import axios from 'axios';
import { replace } from 'lodash';

const baseURL = `${replace(process.env.API || '', /\/$/g, '')}/`;
const baseIlumURL = `${replace(process.env.ILUM_API || '', /\/$/g, '')}/`;

const axiosApp = axios.create({
  baseURL,
  withCredentials: true,
});
const axiosIlumApp = axios.create({
  baseURL: baseIlumURL,
});

export default axiosApp;

export { axiosIlumApp };

import axios from 'axios';
import { replace } from 'lodash';

const baseIlumURL = `${replace(process.env.ILUM_API || '', /\/$/g, '')}/`;

const axiosIlumApp = axios.create({
  baseURL: baseIlumURL,
});

export { axiosIlumApp };

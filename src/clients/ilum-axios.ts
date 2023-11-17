import { axiosIlumApp } from '../helpers/api/axios-app';
import { AxiosRequestConfig } from 'axios';

export default async <Body>(route: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axiosIlumApp<Body>({
      url: route,

      ...options,
    });
    return data;
  } catch (error) {
    return undefined;
  }
};

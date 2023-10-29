import { AxiosRequestConfig } from 'axios';
import { axiosIlumApp } from '../handlers/api/axios-app';

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

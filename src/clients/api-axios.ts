import { AxiosRequestConfig } from 'axios';
import { replace } from 'lodash';
import axiosApp from '../handlers/api/axios-app';
import { IApiFailure, IApiSuccess } from '../interfaces/api';

export default async <Body>(route: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axiosApp<IApiSuccess<Body> | IApiFailure>({
      url: replace(route, /^\/+/g, ''),

      ...options,
    });
    return data;
  } catch (error) {
    return { message: 'Could not fetch.', success: false } as IApiFailure;
  }
};

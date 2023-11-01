import axiosApp from '../helpers/api/axios-app';
import { IApiFailure, IApiSuccess } from '../interfaces/api';
import { AxiosRequestConfig } from 'axios';
import { replace } from 'lodash';

export default async <Body>(route: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axiosApp<IApiSuccess<Body> | IApiFailure>({
      url: replace(route, /^\/+/g, ''),
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        ...options.headers,
      },
      ...options,
    });
    return data;
  } catch (error) {
    return { message: 'Could not fetch.', success: false } as IApiFailure;
  }
};

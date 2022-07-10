/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as https from 'https';

import { TOKEN_NAME } from '@/configs/system';

import { getAccessToken } from '@/services/auth';

type EnhancedAxiosRequestConfig = AxiosRequestConfig & {
  onlyClientSideToken?: boolean;
  withCredentials?: boolean;
  customBaseUrl?: string;
  addBaseUrl?: boolean;
  token?: string;
};

type InstanceConfig = AxiosRequestConfig;

type Headers = {
  Authorization?: string;
};

/**
 * Custom api caller (axios instance)
 */
export const apiCaller = async (config: EnhancedAxiosRequestConfig): Promise<AxiosResponse<any>> => {
  const { onlyClientSideToken, token } = config;
  const agentOptions: https.AgentOptions = {};
  const httpsAgent = new https.Agent(agentOptions);
  const headers: Headers = {};

  if (!token && onlyClientSideToken) headers.Authorization = `${TOKEN_NAME} ${getAccessToken()}`;
  if (token && !onlyClientSideToken) headers.Authorization = `${TOKEN_NAME} ${token}`;

  const instanceConfig: InstanceConfig = { ...config, headers };
  const { url, method = 'GET', params, data } = instanceConfig;

  if (process.env.NODE_ENV === 'development') {
    console.log(`%cREQUEST to ${method.toUpperCase()}:`, 'background: #ff8a00; color: #000000; font-weight: bold;');
    console.log(`%c${url}`, 'color: #000000; font-weight: bold;');
    data && console.log('Request data', data);
    params && console.log('Request params', params);
    console.log('--------------------');
  }

  let isBaseUrlAvailable: boolean;

  if (config.addBaseUrl) {
    isBaseUrlAvailable = config.addBaseUrl;
  } else {
    isBaseUrlAvailable = true;
  }

  const axiosInstance: AxiosInstance = axios.create({
    withCredentials: config.withCredentials,
    httpsAgent,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...(isBaseUrlAvailable && {
      baseURL: config.customBaseUrl || process.env.BACKEND_HTTP_API_ENDPOINT,
    }),
  });

  return axiosInstance
    .request({
      ...instanceConfig,
    })
    .then((response) => {
      if (process.env.NODE_ENV === 'development') {
        if (response.status >= 400) {
          console.error(
            `%cResponse from ${method.toUpperCase()}:`,
            'background: #ff3e5f; color: #ffffff; font-weight: bold;'
          );
          console.error(`%c${url}`, 'color: #000000; font-weight: bold;');
          console.error(`%cError ${response.status} `, 'color: #000000; font-weight: bold;', response);
          console.log('--------------------');

          return response;
        }

        console.log(
          `%cResponse from ${method.toUpperCase()}:`,
          'background: #39a36a; color: #000000; font-weight: bold;'
        );
        console.log(`%c${url}`, 'color: #000000; font-weight: bold;');
        console.log('Response data', response.data);
        console.log('--------------------');
      }

      return response;
    })
    .catch((e) => {
      console.error('Error!', e);

      if (e.response) {
        return Promise.reject({
          statusText: e.response.statusText || '',
          status: e.response.status,
          data: e.response.data,
        });
      }

      return Promise.reject(e);
    });
};

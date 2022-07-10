import { AxiosResponse } from 'axios';

import { PROXY_URL } from '@/configs/system';

import { apiCaller } from '@/utils/api-caller';

export const getForecastReq = async (
  appid: string,
  lat: string,
  lon: string
): Promise<AxiosResponse<Record<string, any>>> =>
  apiCaller({
    addBaseUrl: false,
    params: { appid, lat, lon },
    method: 'get',
    url: `${PROXY_URL}https://api.openweathermap.org/data/2.5/forecast`,
  });

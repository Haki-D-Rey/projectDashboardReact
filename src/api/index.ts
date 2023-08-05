import axios from 'axios';
import { getSession } from 'next-auth/react';
import { IGetAuthTokenUniversal } from './types/external';

const ApiClientV2 = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_V2,
  });

  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      // @ts-ignore
      config.headers['Authorization'] = session?.accessToken ? `Token ${session?.accessToken}` : '';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return instance;
};

const ApiClientV1 = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      // @ts-ignore
      config.headers['Authorization'] = session?.accessToken ? `Token ${session?.accessToken}` : '';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return instance;
};

const ApiUniversal = async() => {
  const apiToken = 'TKc6ynzztcV4MwcVkmgH-7RMdTOiZWAtJ0KpFXZJwiyJVdeogi3cp05r2qgHpX7bnPo';
  const userEmail = 'cesar.cuadra@bartercapital-group.com';

  // Obtener el token de autenticación
  const { data } = await axios.get<IGetAuthTokenUniversal>('https://www.universal-tutorial.com/api/getaccesstoken', {
    headers: {
      'api-token': apiToken,
      Accept: 'application/json',
      'user-email': userEmail,
    },
  });

  // Configurar la instancia de axios con el token de autenticación
  const instance = axios.create({
    baseURL: 'https://www.universal-tutorial.com/api',
    headers: {
      Authorization: data.auth_token ? `Bearer ${data.auth_token}` : '',
    },
  });

  return instance;
};

export { ApiClientV2, ApiClientV1, ApiUniversal };
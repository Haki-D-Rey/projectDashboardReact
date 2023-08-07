import { ApiClientV1,ApiClientV2 } from '../index';
import type {
  IMutationResetPasswordArgs,
  IMutationEditUserArgs,
  IMutationVerifyEmailArgs,
  IResponseLogin,
  IResponsePostUserUpdate,
  IResponseRegister,
  IResponseResetPassword,
  IResponseVerifyEmail,
  IResponseGetUserAccountData,
} from '../types/user';
import type { IMutationLoginArgs, IMutationRegisterArgs } from '../types/user';
import type { IQueryNetworkArgs, IResponseGetNetWork } from './../types/user';
import type { IQueryGetUserDataArgs, IResponseGetUserData } from './../types/user';
import type { IMutationSendActiveKey, IResponseSendActiveKey } from './../types/user';

const api = ApiClientV1();
const apiV2 = ApiClientV2();

export async function login(data: IMutationLoginArgs): Promise<IResponseLogin> {
  const response = await apiV2.post('/barter_auth/login/', data);
  console.log('🚀 ~ file: users.ts:10 ~ login ~ response:', response);
  return response.data;
}

export async function register(data: IMutationRegisterArgs): Promise<IResponseRegister> {
  const url = `/barter_auth/register/`;

  const response = await apiV2.post(url, data);
  return response.data;
}

export async function resetPassword(data: IMutationResetPasswordArgs): Promise<IResponseResetPassword> {
  const response = await api.post('/users/change_password/', data);
  return response.data;
}

export async function verifyEmail(data: IMutationVerifyEmailArgs): Promise<IResponseVerifyEmail> {
  const response = await api.get('/activate/', {
    params: {
      token: data.key,
    },
  });
  return response.data;
}

export async function getUserData(data: IQueryGetUserDataArgs): Promise<IResponseGetUserData> {
  const response = await apiV2.get(`/barter_auth/users/${data.id}/profile/`);
  return response.data;
}

export async function getUserAccountData(data: IQueryGetUserDataArgs): Promise<IResponseGetUserAccountData> {
  const response = await apiV2.get(`/barter_auth/users/${data.id}/account/`);
  return response.data;
}

export async function getNetWork(data: IQueryNetworkArgs): Promise<IResponseGetNetWork> {
  const response = await api.get(`/network/${data.id}/network/`);
  return response.data;
}

export async function sendActiveKey(data: IMutationSendActiveKey): Promise<IResponseSendActiveKey> {
  const response = await api.post(`/users/${data.id}/send-active-key/`);
  return response.data;
}

export async function updateEditUser(data: IMutationEditUserArgs): Promise<IResponsePostUserUpdate> {
  const response = await apiV2.patch(`/barter_auth/users/${data?.id}/profile/`, data);
  return response.data;
}
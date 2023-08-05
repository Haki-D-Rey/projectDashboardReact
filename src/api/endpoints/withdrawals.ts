import {ApiClientV1} from '../index';

import type { IResponseCreateWithdrawal, IMutationCreateWithdrawalArgs } from '../types/withdrawal';

const api = ApiClientV1();

export async function createWithdrawal(data: IMutationCreateWithdrawalArgs): Promise<IResponseCreateWithdrawal> {
  const response = await ApiClientV1().post('/withdrawal/', data);
  return response.data;
}
